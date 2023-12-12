import { data } from "./input";

export class Solution_D1_P1 {
    public static solve(): number {
        let acc = 0;

        for(const line of data.split("\n")) {
            let line_code = "";
            // forwards
            for(let i = 0; i < line.length; i++) {
                if(!Number.isNaN(Number(line[i]))) {
                    line_code += line[i];
                    break;
                }
            }

            // backwards
            for(let i = line.length - 1; i >= 0; i--) {
                if(!Number.isNaN(Number(line[i]))) {
                    line_code += line[i];
                    break;
                }
            }

            acc += Number(line_code);
        }

        return acc;
    }
}
