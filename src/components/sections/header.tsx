"use client";

import { type HeaderData } from "@/app/data";
import { PrismaHero } from "@/components/ui/prisma-hero";

interface HeaderProps {
  data: HeaderData;
}

export function Header({ data }: HeaderProps) {
  return <PrismaHero title={data.name} description={data.bio} socials={data.socials} />;
}
