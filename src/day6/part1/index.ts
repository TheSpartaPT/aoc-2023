import { data } from "./input";

type Race = {
    time: number;
    distance: number;
};

export class Solution_D6_P1 {
    private static races: Race[] = [];

    private static prepare() {
        const lines = data.split("\n");

        const times = lines[0].split(/\:\s+/)[1].split(/\s+/).map(Number);
        const distances = lines[1].split(/\:\s+/)[1].split(/\s+/).map(Number);

        for(let i = 0; i < times.length; i++) {
            this.races[i] = {
                time: times[i],
                distance: distances[i]
            }
        }
    }

    public static solve(): number {
        this.prepare();

        let result = 1;

        for(const race of this.races) {
            let faster_count = 0;
            for(let button_time = 1; button_time < race.time; button_time++) {
                if(button_time * (race.time - button_time) > race.distance) {
                    faster_count++;
                }
            }

            result *= faster_count;
        }

        return result;
    }
}
