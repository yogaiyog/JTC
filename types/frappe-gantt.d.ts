declare module "frappe-gantt" {
  export type GanttTask = {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    custom_class?: string;
  };

  export type PopupContext = {
    task: GanttTask & {
      _start: Date;
      _end: Date;
    };
    set_title: (value: string) => void;
    set_subtitle: (value: string) => void;
    set_details: (value: string) => void;
  };

  export type GanttOptions = {
    container_height?: number | "auto";
    bar_height?: number;
    padding?: number;
    column_width?: number;
    view_mode?: "Day" | "Week" | "Month" | "Year";
    view_mode_select?: boolean;
    today_button?: boolean;
    readonly?: boolean;
    readonly_dates?: boolean;
    readonly_progress?: boolean;
    infinite_padding?: boolean;
    language?: string;
    popup_on?: "click" | "hover";
    scroll_to?: string;
    popup?: ((context: PopupContext) => string | false | undefined) | false;
  };

  export default class Gantt {
    constructor(
      container: string | HTMLElement,
      tasks: GanttTask[],
      options?: GanttOptions
    );
    destroy?(): void;
  }
}
