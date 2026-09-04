"use client";

import { Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Brand } from "@/components/atoms/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  ["#platform", "Platform"],
  ["#workflow", "How it works"],
  ["#teams", "For teams"],
  ["https://hub.wardnai.dev/", "Hub"],
] as const;

const mobileMenuQuery = "(max-width: 800px)";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileMenuQuery);
    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches) setOpen(false);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const menuActive = open && isMobile;
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");
    const skipLink = document.querySelector<HTMLElement>(".skip-link");
    const obscuredElements = [main, footer, skipLink].filter((element): element is HTMLElement => Boolean(element));

    document.body.classList.toggle("menu-open", menuActive);
    obscuredElements.forEach((element) => { element.inert = menuActive; });

    if (!menuActive) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableElements = [
      menuToggleRef.current,
      ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
    ].filter((element): element is HTMLElement => Boolean(element));

    focusableElements[1]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("menu-open");
      obscuredElements.forEach((element) => { element.inert = false; });
      if (window.matchMedia(mobileMenuQuery).matches) previouslyFocused?.focus();
    };
  }, [isMobile, open]);

  return (
    <header className={cn("site-header", scrolled && "scrolled")}>
      <div className="nav-shell">
        <Brand />
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
          ref={menuToggleRef}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={cn("primary-nav", open && "open")} aria-label="Primary navigation" ref={menuRef}>
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-github" href="https://github.com/abhi1693/wardn-ai" target="_blank" rel="noreferrer" aria-label="Wardn AI on GitHub"><Github /></a>
          <Button asChild variant="light" size="sm">
            <a href="https://github.com/abhi1693/wardn-ai#local-development" target="_blank" rel="noreferrer">Self-host Wardn <span aria-hidden="true">↗</span></a>
          </Button>
        </div>
      </div>
    </header>
  );
}
