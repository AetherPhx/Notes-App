import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: "@styles",
				replacement: path.resolve(path.join(__dirname, "/src/styles")),
			},
			{
				find: "@assets",
				replacement: path.resolve(path.join(__dirname, "/src/assets")),
			},
			{
				find: "@context",
				replacement: path.resolve(path.join(__dirname, "/src/context")),
			},
			{
				find: "@models",
				replacement: path.resolve(path.join(__dirname, "/src/models")),
			},
			{
				find: "@storage",
				replacement: path.resolve(path.join(__dirname, "/src/storage")),
			},
			{
				find: "@components",
				replacement: path.resolve(path.join(__dirname, "/src/components")),
			},
			{
				find: "@atoms",
				replacement: path.resolve(
					path.join(__dirname, "/src/components/atoms")
				),
			},
			{
				find: "@molecules",
				replacement: path.resolve(
					path.join(__dirname, "/src/components/molecules")
				),
			},
			{
				find: "@organisms",
				replacement: path.resolve(
					path.join(__dirname, "/src/components/organisms")
				),
			},
			{
				find: "@pages",
				replacement: path.resolve(
					path.join(__dirname, "/src/components/pages")
				),
			},
			{
				find: "@templates",
				replacement: path.resolve(
					path.join(__dirname, "/src/components/templates")
				),
			},
		],
	},
});
