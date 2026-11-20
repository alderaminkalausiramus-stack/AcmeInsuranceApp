import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Search,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Edit3,
  Trash2,
  Power,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserProfile, UserRole } from '../types/auth';
import { listUsers, createUser, updateUser, deleteUser } from '../services/usersService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Dialog } from '../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

interface UserFormState {
  email: string;
  fullName: string;
  title: string;
  role: UserRole;
  password: string;
}

const INITIAL_CREATE_FORM: UserFormState = {
  email: '',
  fullName: '',
  title: 'Claims Adjuster',
  role: 'user',
  password: '',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const UsersPage: React.FC = () => {
  const { profile: currentUser, refreshProfile } = useAuth();

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<UserFormState>(INITIAL_CREATE_FORM);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editForm, setEditForm] = useState<UserFormState>(INITIAL_CREATE_FORM);

  const [deletingUser, setDeletingUser] = useState<UserProfile | null>(null);
  const [busyUserId, setBusyUserId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to load users.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const stats = useMemo(() => {
    const total = users.length;
    const superadmins = users.filter((u) => u.role === 'superadmin').length;
    const adjusters = users.filter((u) => u.role === 'user').length;
    const active = users.filter((u) => u.isActive).length;
    return { total, superadmins, adjusters, active };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (!q) return true;
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.title.toLowerCase().includes(q)
      );
    });
  }, [users, searchQuery, roleFilter]);

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    window.setTimeout(() => {
      setSuccessMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const handleOpenCreate = () => {
    setCreateForm(INITIAL_CREATE_FORM);
    setModalError(null);
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setIsSubmitting(true);

    try {
      const created = await createUser({
        email: createForm.email.trim(),
        fullName: createForm.fullName.trim(),
        title:
          createForm.title.trim() ||
          (createForm.role === 'superadmin' ? 'System Administrator' : 'Claims Adjuster'),
        role: createForm.role,
        password: createForm.password,
      });
      setUsers((prev) => [...prev, created]);
      setIsCreateOpen(false);
      showToast(
        `Created ${created.role === 'superadmin' ? 'Superadmin' : 'Claims Adjuster'} account for ${created.fullName}.`
      );
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Failed to create user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEdit = (target: UserProfile) => {
    setEditingUser(target);
    setEditForm({
      email: target.email,
      fullName: target.fullName,
      title: target.title,
      role: target.role,
      password: '',
    });
    setModalError(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setModalError(null);
    setIsSubmitting(true);

    try {
      const updated = await updateUser({
        userId: editingUser.id,
        fullName: editForm.fullName.trim(),
        title: editForm.title.trim(),
        role: editForm.role,
        password: editForm.password.trim() ? editForm.password : undefined,
      });
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      if (updated.id === currentUser?.id) {
        await refreshProfile();
      }
      setEditingUser(null);
      showToast(`Updated account for ${updated.fullName}.`);
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Failed to update user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (target: UserProfile) => {
    setBusyUserId(target.id);
    setErrorMessage(null);
    try {
      const updated = await updateUser({
        userId: target.id,
        isActive: !target.isActive,
      });
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      showToast(
        updated.isActive
          ? `Reactivated ${updated.fullName}.`
          : `Deactivated ${updated.fullName}. They can no longer sign in.`
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update user status.');
    } finally {
      setBusyUserId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    setIsSubmitting(true);
    setModalError(null);
    try {
      await deleteUser(deletingUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
      const deletedName = deletingUser.fullName;
      setDeletingUser(null);
      showToast(`Deleted user account for ${deletedName}.`);
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Failed to delete user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">User Management</h1>
            <Badge variant="default">
              <ShieldCheck className="h-3 w-3" />
              <span>Superadmin Console</span>
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Provision Acme Insurance accounts, assign Superadmin or Claims Adjuster roles, and manage access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void loadUsers()}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button type="button" size="sm" onClick={handleOpenCreate}>
            <UserPlus className="h-3.5 w-3.5" />
            <span>Add User</span>
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-foreground">{stats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Superadmins</CardTitle>
            <ShieldCheck className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-foreground">{stats.superadmins}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Adjusters</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-foreground">{stats.adjusters}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Active</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-emerald-700">{stats.active}</p>
          </CardContent>
        </Card>
      </div>

      {successMessage && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs text-rose-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Directory Card */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/20">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or title..."
              className="pl-9 bg-background"
            />
          </div>

          <div className="grid grid-cols-3 sm:inline-flex items-center rounded-md border border-border bg-muted p-0.5">
            {(['all', 'superadmin', 'user'] as const).map((option) => {
              const label =
                option === 'all'
                  ? `All (${stats.total})`
                  : option === 'superadmin'
                    ? `Admin (${stats.superadmins})`
                    : `Adjuster (${stats.adjusters})`;
              const isSelected = roleFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRoleFilter(option)}
                  className={`px-2.5 py-1.5 sm:py-1 rounded text-xs font-medium transition ${
                    isSelected
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="h-5 w-5 text-foreground animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium text-muted-foreground">Loading directory...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">No matching users found</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Adjust your search filter or add a new account.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Stacked User Cards */}
            <div className="md:hidden divide-y divide-border">
              {filteredUsers.map((member) => {
                const isSelf = member.id === currentUser?.id;
                const isBusy = busyUserId === member.id;
                return (
                  <div key={member.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-9 w-9 rounded-md flex items-center justify-center text-xs font-semibold border shrink-0 ${
                            member.role === 'superadmin'
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-secondary text-secondary-foreground border-border'
                          }`}
                        >
                          {getInitials(member.fullName)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {member.fullName}
                            </p>
                            {isSelf && <Badge variant="outline">You</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                        </div>
                      </div>
                      {member.isActive ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        {member.role === 'superadmin' ? (
                          <Badge variant="default">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Superadmin</span>
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Normal User</Badge>
                        )}
                        <span>&middot; {member.title}</span>
                      </div>
                      <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(member)}
                        className="flex-1 text-xs"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </Button>

                      {!isSelf && (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isBusy}
                            onClick={() => void handleToggleActive(member)}
                            className="flex-1 text-xs"
                          >
                            <Power className="h-3.5 w-3.5" />
                            <span>{member.isActive ? 'Deactivate' : 'Activate'}</span>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            disabled={isBusy}
                            aria-label={`Delete ${member.fullName}`}
                            onClick={() => {
                              setModalError(null);
                              setDeletingUser(member);
                            }}
                            className="text-rose-600 hover:bg-rose-50 hover:border-rose-200 shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop shadcn Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((member) => {
                    const isSelf = member.id === currentUser?.id;
                    const isBusy = busyUserId === member.id;
                    return (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-8 w-8 rounded-md flex items-center justify-center text-xs font-semibold border shrink-0 ${
                                member.role === 'superadmin'
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-secondary text-secondary-foreground border-border'
                              }`}
                            >
                              {getInitials(member.fullName)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-foreground">
                                  {member.fullName}
                                </span>
                                {isSelf && <Badge variant="outline">You</Badge>}
                              </div>
                              <p className="text-[11px] text-muted-foreground">
                                {member.email} &middot; {member.title}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {member.role === 'superadmin' ? (
                            <Badge variant="default">
                              <ShieldCheck className="h-3 w-3" />
                              <span>Superadmin</span>
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Normal User</Badge>
                          )}
                        </TableCell>

                        <TableCell>
                          {member.isActive ? (
                            <Badge variant="success">Active</Badge>
                          ) : (
                            <Badge variant="destructive">Deactivated</Badge>
                          )}
                        </TableCell>

                        <TableCell className="text-muted-foreground whitespace-nowrap">
                          {new Date(member.createdAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell className="text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenEdit(member)}
                              className="h-7 px-2.5 text-xs"
                            >
                              <Edit3 className="h-3 w-3" />
                              <span>Edit</span>
                            </Button>

                            {!isSelf && (
                              <>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  disabled={isBusy}
                                  onClick={() => void handleToggleActive(member)}
                                  className="h-7 px-2.5 text-xs"
                                >
                                  <Power className="h-3 w-3" />
                                  <span>{member.isActive ? 'Deactivate' : 'Activate'}</span>
                                </Button>

                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  disabled={isBusy}
                                  aria-label={`Delete ${member.fullName}`}
                                  onClick={() => {
                                    setModalError(null);
                                    setDeletingUser(member);
                                  }}
                                  className="h-7 w-7 text-rose-600 hover:bg-rose-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </Card>

      {/* Create User Dialog */}
      <Dialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        disableClose={isSubmitting}
        title="Create New User"
        description="Provision a new Superadmin or Claims Adjuster account."
        maxWidthClassName="max-w-md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          {modalError && (
            <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {modalError}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="cu-name">Full Name</Label>
            <Input
              id="cu-name"
              type="text"
              required
              value={createForm.fullName}
              onChange={(e) => setCreateForm((f) => ({ ...f, fullName: e.target.value }))}
              placeholder="Alex Morgan"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cu-email">Work Email</Label>
            <Input
              id="cu-email"
              type="email"
              required
              value={createForm.email}
              onChange={(e) => setCreateForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="alex@acme-insurance.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="cu-role">Role</Label>
              <Select
                id="cu-role"
                value={createForm.role}
                onChange={(e) => setCreateForm((f) => ({ ...f, role: e.target.value as UserRole }))}
              >
                <option value="user">Normal User (Adjuster)</option>
                <option value="superadmin">Superadmin</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cu-title">Job Title</Label>
              <Input
                id="cu-title"
                type="text"
                required
                value={createForm.title}
                onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Claims Adjuster"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cu-password">Temporary Password (min. 8 characters)</Label>
            <Input
              id="cu-password"
              type="password"
              required
              minLength={8}
              value={createForm.password}
              onChange={(e) => setCreateForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="At least 8 characters"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Create Account</span>
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        disableClose={isSubmitting}
        title={editingUser ? `Edit User — ${editingUser.fullName}` : 'Edit User'}
        maxWidthClassName="max-w-md"
      >
        {editingUser && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {modalError && (
              <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {modalError}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="eu-email">Email</Label>
              <Input id="eu-email" type="email" disabled value={editForm.email} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eu-name">Full Name</Label>
              <Input
                id="eu-name"
                type="text"
                required
                value={editForm.fullName}
                onChange={(e) => setEditForm((f) => ({ ...f, fullName: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="eu-role">Role</Label>
                <Select
                  id="eu-role"
                  value={editForm.role}
                  disabled={editingUser.id === currentUser?.id}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, role: e.target.value as UserRole }))
                  }
                >
                  <option value="user">Normal User (Adjuster)</option>
                  <option value="superadmin">Superadmin</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="eu-title">Job Title</Label>
                <Input
                  id="eu-title"
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eu-password">Reset Password (optional)</Label>
              <Input
                id="eu-password"
                type="password"
                minLength={8}
                value={editForm.password}
                onChange={(e) => setEditForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Leave blank to keep existing password"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingUser(null)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>Save Changes</span>
              </Button>
            </div>
          </form>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        disableClose={isSubmitting}
        title="Delete user account?"
        maxWidthClassName="max-w-sm"
      >
        {deletingUser && (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              This permanently removes <strong className="text-foreground">{deletingUser.fullName}</strong>{' '}
              ({deletingUser.email}) from Acme Insurance.
            </p>

            {modalError && (
              <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {modalError}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeletingUser(null)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isSubmitting}
                onClick={() => void handleConfirmDelete()}
                className="w-full sm:w-auto"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>Delete User</span>
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
