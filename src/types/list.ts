import { SaveList } from "@prisma/client";
import { WithHide } from ".";

export type FavListOutput = SaveList;
export type FavListProps = Partial<SaveList>;
export type FavListCreateInput = Pick<SaveList, "name" | "emoji" | "color">;
