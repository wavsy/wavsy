export type Project = {
  slug: string;
  name: string;
  company: string;
  industry: string;
  result: string;
  url?: string;
};

export const projects: Project[] = [];

export const projectsContent = {
  title: "Избрани проекти",
  pageTitle: "Проекти",
  lead: "Тук ще показваме реална работа — с име, бранш и резултат. Засега слотовете стоят празни нарочно.",
  emptyLabel: "Скоро",
  emptyName: "Проект",
  emptyHint: "Първите публични проекти ще се появят тук.",
  slots: 2,
} as const;
