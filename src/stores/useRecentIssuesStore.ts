import {create} from "zustand";
import {persist} from "zustand/middleware";
import {IssueModel} from "../domain/models/Issue.model";

interface RecentIssuesState {
    recent: IssueModel[];
    addIssue: (issue: IssueModel) => void;
    clear: () => void;
}

export const useRecentIssuesStore = create<RecentIssuesState>()(
    persist(
        (set, get) => ({
            recent: [],
            addIssue: (issue: IssueModel) => {
                const current = get().recent.filter(i => i.id !== issue.id);
                set({recent: [issue, ...current].slice(0, 5)});
            },
            clear: () => set({recent: []}),
        }),
        {
            name: "recent-issues",
        }
    )
);
