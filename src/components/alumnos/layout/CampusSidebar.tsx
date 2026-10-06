"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { monoLabel } from "@/components/alumnos/ui/styles";
import CampusBrand from "./CampusBrand";
import SignOutButton from "./SignOutButton";
import { AREA_NAV_ITEMS, isNavItemActive } from "./navItems";

export type SidebarCourse = { slug: string; title: string; tone: string; placeholder: boolean };
export type SidebarAccount = { label: string; initial: string };

type CampusSidebarProps = {
  courses: SidebarCourse[];
  account: SidebarAccount;
};

/** Máximo de accesos directos a formaciones; con más, "Ver todas". */
const MAX_COURSE_SHORTCUTS = 6;

/**
 * Navegación lateral del campus (≥1024px): marca, secciones, accesos
 * directos a las formaciones del alumno y, abajo, su identidad, la vuelta a
 * la web y cerrar sesión. Fija a la altura de la ventana.
 */
export default function CampusSidebar({ courses, account }: CampusSidebarProps) {
  const pathname = usePathname();
  const shortcuts = courses.slice(0, MAX_COURSE_SHORTCUTS);

  return (
    <div className="hidden w-[16.5rem] shrink-0 border-r border-campus-line bg-campus-surface lg:block">
      <aside className="sticky top-0 flex h-dvh flex-col">
        <div className="px-6 pb-8 pt-7">
          <CampusBrand />
        </div>

        <nav aria-label="Campus" className="px-3">
          <ul className="flex flex-col gap-1">
            {AREA_NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item, pathname);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] transition-colors duration-300 ${
                      active
                        ? "bg-campus-raised font-medium text-campus-ink"
                        : "text-campus-muted hover:bg-campus-raised/60 hover:text-campus-ink"
                    }`}
                  >
                    {active ? <span aria-hidden className="absolute inset-y-2.5 left-0 w-0.5 rounded-full bg-campus-accent" /> : null}
                    <Icon size={18} strokeWidth={active ? 1.75 : 1.5} aria-hidden className={active ? "text-campus-accent" : ""} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {shortcuts.length > 0 ? (
          <div className="mt-9 flex min-h-0 flex-1 flex-col">
            <p className={`${monoLabel} px-6 pb-3 text-campus-subtle`}>Tus formaciones</p>
            <ul className="flex min-h-0 flex-col gap-0.5 overflow-y-auto px-3">
              {shortcuts.map((course) => {
                const href = alumnosRoutes.course(course.slug);
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={course.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      title={course.title}
                      className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13.5px] transition-colors duration-300 ${
                        active ? "bg-campus-raised text-campus-ink" : "text-campus-muted hover:text-campus-ink"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 shrink-0 rounded-[3px] ring-1 ring-campus-line-strong"
                        style={{ backgroundColor: course.tone }}
                      />
                      <span className={`truncate ${course.placeholder ? "opacity-60" : ""}`}>{course.title}</span>
                    </Link>
                  </li>
                );
              })}
              {courses.length > MAX_COURSE_SHORTCUTS ? (
                <li>
                  <Link href={alumnosRoutes.courses} className="flex min-h-10 items-center px-3 text-[13px] text-campus-subtle hover:text-campus-ink">
                    Ver todas
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="mt-6 flex flex-col gap-1 border-t border-campus-line p-3">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-campus-raised font-campus-mono text-sm text-campus-ink ring-1 ring-campus-line-strong"
            >
              {account.initial}
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] text-campus-muted" title={account.label}>
              {account.label}
            </span>
          </div>
          <Link
            href="/"
            className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-campus-muted transition-colors duration-300 hover:bg-campus-raised hover:text-campus-ink"
          >
            <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden />
            Ir a psaiflow.com
          </Link>
          <SignOutButton />
        </div>
      </aside>
    </div>
  );
}
