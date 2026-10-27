'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  ActionIcon,
  Badge,
  Button,
  Center,
  Collapse,
  Container,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  Plus,
  Trash2,
  Edit,
  AlertCircle,
  X,
  Check,
  Search,
} from 'lucide-react';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '@/app/store/api/userApi';
import type { AdminUser } from '@/app/store/api/userApi';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const ROLE_COLOR: Record<string, string> = {
  admin: 'red',
  editor: 'blue',
  viewer: 'gray',
};

export default function AdminUsersPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('auth_token');
    setToken(stored);
    if (!stored) router.push('/admin/login');
  }, [router]);

  const { data: users, isLoading, error } = useGetUsersQuery(undefined, { skip: !token });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  useEffect(() => {
    const status = (error as { status?: number } | undefined)?.status;
    if (status === 401) {
      localStorage.removeItem('auth_token');
      setToken(null);
      router.push('/admin/login');
    }
  }, [error, router]);

  const filtered = useMemo(() => {
    const list = users ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((u) =>
      [u.name, u.email, u.phone, u.username, u.role]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [users, search]);

  const resetForm = () => {
    setEditId(null);
    setName('');
    setEmail('');
    setPhone('');
    setUsername('');
    setPassword('');
    setRole('admin');
    setIsActive(true);
    setFormError(null);
    setShowForm(false);
  };

  const startCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const startEdit = (user: AdminUser) => {
    setEditId(user.id);
    setName(user.name ?? '');
    setEmail(user.email ?? '');
    setPhone(user.phone ?? '');
    setUsername(user.username);
    setPassword('');
    setRole(user.role || 'admin');
    setIsActive(user.isActive !== false);
    setFormError(null);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);

    if (!username.trim()) {
      setFormError('Username is required');
      return;
    }
    if (username.trim().length < 3) {
      setFormError('Username must be at least 3 characters');
      return;
    }
    if (!isEditing && password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    if (password && password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    const payload = {
      username: username.trim(),
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      role,
      isActive,
      ...(password ? { password } : {}),
    };

    try {
      if (isEditing) {
        await updateUser({ id: editId, data: payload }).unwrap();
      } else {
        await createUser({ ...payload, password }).unwrap();
      }
      resetForm();
    } catch (err: any) {
      const status = err?.status || err?.originalStatus;
      if (status === 401) {
        localStorage.removeItem('auth_token');
        router.push('/admin/login');
        return;
      }
      const msg = err?.data?.message || err?.message || err?.toString?.() || 'Request failed';
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleDelete = async (user: AdminUser) => {
    if (!confirm(`Delete user "${user.username}"?`)) return;
    try {
      await deleteUser(user.id).unwrap();
    } catch (err: any) {
      const status = err?.status || err?.originalStatus;
      if (status === 401) {
        localStorage.removeItem('auth_token');
        router.push('/admin/login');
        return;
      }
      alert(err?.data?.message || 'Delete failed');
    }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  if (!token) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Users</Title>
        <Group>
          <Button leftSection={<Plus size={14} />} size="sm" onClick={startCreate}>
            Add User
          </Button>
        </Group>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit User' : 'Add User'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>
              Cancel
            </Button>
          </Group>
          <Stack gap="sm">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <TextInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Full name"
              />
              <TextInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                placeholder="username"
                required
              />
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="user@example.com"
              />
              <TextInput
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                placeholder="+251 911 234 567"
              />
              <Select
                label="Roles"
                data={ROLE_OPTIONS}
                value={role}
                onChange={(value) => setRole(value || 'admin')}
                allowDeselect={false}
                required
              />
              <PasswordInput
                label={isEditing ? 'New Password (optional)' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder={isEditing ? 'Leave blank to keep current' : 'Min 6 characters'}
                required={!isEditing}
              />
            </SimpleGrid>

            <Switch
              label="Active (can sign in)"
              checked={isActive}
              onChange={(e) => setIsActive(e.currentTarget.checked)}
            />

            {formError && (
              <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">
                {formError}
              </Alert>
            )}

            <Group justify="flex-end">
              <Button
                leftSection={isEditing ? <Check size={14} /> : <Plus size={14} />}
                onClick={handleSubmit}
                loading={isCreating || isUpdating}
              >
                {isEditing ? 'Save Changes' : 'Save'}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Collapse>

      <TextInput
        placeholder="Search..."
        leftSection={<Search size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
        maw={360}
      />

      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && (
        <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">
          Could not load users. Make sure you are signed in.
        </Alert>
      )}
      {users && users.length === 0 && (
        <Center py={64}><Text c="gray.4">No users yet.</Text></Center>
      )}
      {users && users.length > 0 && filtered.length === 0 && (
        <Center py={64}><Text c="gray.4">No users match your search.</Text></Center>
      )}

      {filtered.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <Table striped highlightOnHover horizontalSpacing="xs" fz="sm" style={{ minWidth: 470, tableLayout: 'fixed' }}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w="14%">Name</Table.Th>
                <Table.Th w="19%">Email</Table.Th>
                <Table.Th w="18%">Phone</Table.Th>
                <Table.Th w="18%">Username</Table.Th>
                <Table.Th w="16%">Roles</Table.Th>
                <Table.Th w="15%">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filtered.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>
                    <Text lineClamp={1} title={user.name || undefined}>{user.name || '—'}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text lineClamp={1} title={user.email || undefined}>{user.email || '—'}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" lineClamp={1} title={user.phone || undefined}>{user.phone || '—'}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text lineClamp={1} fw={500}>{user.username}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={2} align="flex-start">
                      <Badge variant="light" color={ROLE_COLOR[user.role] || 'gray'} size="sm">
                        {user.role}
                      </Badge>
                      {user.isActive === false && (
                        <Badge color="gray" size="sm">inactive</Badge>
                      )}
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={4} wrap="nowrap">
                      <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => startEdit(user)} aria-label="Edit user">
                        <Edit size={14} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="red" size="sm" onClick={() => handleDelete(user)} aria-label="Delete user">
                        <Trash2 size={14} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
