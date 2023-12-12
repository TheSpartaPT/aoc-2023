import { data } from "./input";

export class Solution_D3_P1 {
    private static lines: string[] = [];
    private static parts = new Set([".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    private static result = 0;
    private static in_number = false;
    private static last_number = "";
    private static number_idx_start = NaN;
    private static number_idx_end = NaN;

    private static reset() {
        this.in_number = false;
        this.last_number = "";
        this.number_idx_start = NaN;
        this.number_idx_end = NaN;
    }

    private static handleNumber(line: string, line_idx: number) {
        const min_line_idx = line_idx > 0 ? line_idx - 1 : line_idx;
        const max_line_idx = line_idx < this.lines.length - 1 ? line_idx + 1 : line_idx;
        const min_char_idx = this.number_idx_start > 0 ? this.number_idx_start - 1 : this.number_idx_start;
        const max_char_idx = this.number_idx_end < line.length - 1 ? this.number_idx_end + 1 : this.number_idx_end;

        line_loop: for(let curr_line_idx = min_line_idx; curr_line_idx <= max_line_idx; curr_line_idx++) {
            for(let curr_char_idx = min_char_idx; curr_char_idx <= max_char_idx; curr_char_idx++) {
                if(curr_line_idx === line_idx && (curr_char_idx >= this.number_idx_start && curr_char_idx <= this.number_idx_end)) {
                    continue;
                }

                if(!this.parts.has(this.lines[curr_line_idx][curr_char_idx])) {
                    this.result += Number(this.last_number);
                    
                    break line_loop;
                }
            }
        }

        this.reset();
    }

    public static solve(): number {
        this.lines = data.split("\n");
        for(let line_idx = 0; line_idx < this.lines.length; line_idx++) {
            for(let char_idx = 0; char_idx < this.lines[line_idx].length; char_idx++) {
                if(!Number.isNaN(Number(this.lines[line_idx][char_idx]))) {
                    this.last_number += this.lines[line_idx][char_idx];

                    if(!this.number_idx_start) {
                        this.number_idx_start = this.number_idx_end = char_idx;
                    }else {
                        this.number_idx_end = char_idx;
                    }

                    this.in_number = true;
                }else {
                    if(this.in_number) {
                        this.handleNumber(this.lines[line_idx], line_idx);
                    }
                }
            }

            if(this.in_number) {
                this.handleNumber(this.lines[line_idx], line_idx);
            }
        }

        return this.result;
    }
}
