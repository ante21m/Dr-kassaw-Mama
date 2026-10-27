'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  AppShell, NavLink, Group, Text, Box, Stack, Button, Burger,
} from '@mantine/core';
import {
  Newspaper, Briefcase, Building2, Image as ImageIcon, Share2, Stethoscope, ConciergeBell, LogOut, ExternalLink,
  Home as HomeIcon, Users, UserCog, Calendar,
} from 'lucide-react';

const navItems = [
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Vacancies', href: '/admin/vacancies', icon: Briefcase },
  { label: 'Departments', href: '/admin/departments', icon: Building2 },
  { label: 'Physicians', href: '/admin/physicians', icon: Stethoscope },
  { label: 'Services', href: '/admin/services', icon: ConciergeBell },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { label: 'Social Links', href: '/admin/social', icon: Share2 },
  { label: 'Home Page', href: '/admin/home', icon: HomeIcon },
  { label: 'About Page', href: '/admin/about', icon: Users },
  { label: 'Users', href: '/admin/users', icon: UserCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/admin/login');
  };

  return (
    <AppShell
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding={0}
      layout="default"
    >
      <Burger
        opened={opened}
        onClick={() => setOpened((v) => !v)}
        hiddenFrom="sm"
        size="sm"
        aria-label="Toggle navigation"
        style={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 300,
          background: '#fff',
          borderRadius: 8,
          padding: 6,
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        }}
      />

      <AppShell.Navbar
        p="md"
        style={{
          background: '#f8fafc',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <Group gap="sm" mb="sm" px="xs">
            <div style={{ width: 36, height: 36, borderRadius: 9, overflow: 'hidden', background: '#fff', padding: 3, border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 3px 12px rgba(0,0,0,0.28)', flexShrink: 0 }}><img src="/images/km-logo.png" alt="" width={36} height={36} style={{ borderRadius: 7, objectFit: 'contain' }} /></div>
            <Text fw={700} size="sm">Dr. Kassaw Mamma Primary Hospital</Text>
          </Group>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                component={Link}
                href={item.href}
                label={item.label}
                leftSection={<Icon size={17} />}
                active={pathname === item.href}
                variant="light"
                color="blue"
                fz="sm"
                py={4}
                mb={1}
                onClick={() => setOpened(false)}
                style={{ borderRadius: 8 }}
              />
            );
          })}
        </Box>

        <Stack gap={4} pt="sm" pb={40} style={{ flexShrink: 0, borderTop: '1px solid #e5e7eb' }}>
          <Button
            component={Link}
            href="/"
            variant="subtle"
            color="gray"
            size="sm"
            leftSection={<ExternalLink size={14} />}
            fullWidth
            justify="flex-start"
          >
            View Site
          </Button>
          <Button
            variant="subtle"
            color="red"
            size="sm"
            leftSection={<LogOut size={14} />}
            fullWidth
            justify="flex-start"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ background: '#f8fafc', minHeight: '100vh' }}>
        <Box hiddenFrom="sm" h={48} />
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
