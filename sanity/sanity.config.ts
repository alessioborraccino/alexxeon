import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./schemas/schema";
export default defineConfig({
  name: "default",
  title: "Alexx Eon",
  projectId: "nulp5uls",
  dataset: "production",
  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "it", title: "Italian" },
        { id: "de", title: "German" },
      ],
      schemaTypes: ["post"],
      weakReferences: true,
      allowCreateMetaDoc: true,
      apiVersion: "2025-02-19",
    }),
  ],
  schema: { types: schemaTypes },
});
