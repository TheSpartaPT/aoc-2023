import { data } from "./input";

type MapHeader = "seed-to-soil" | "soil-to-fertilizer" | "fertilizer-to-water" | "water-to-light" | "light-to-temperature" | "temperature-to-humidity" | "humidity-to-location";

type MapRange = {
    src_start: number;
    src_end: number;
    dest_start: number;
};

export class Solution_D5_P1 {
    private static seeds: Set<number> = new Set();
    private static rules: Map<MapHeader, MapRange[]> = new Map();

    private static prepare() {
        const sections = data.split("\n\n");

        this.seeds = new Set(sections[0].split(": ")[1].split(" ").map(Number));

        for(let i = 1; i < sections.length; i++) {
            const section = sections[i].split(" map:\n");

            const map_header = section[0] as MapHeader;
            const map_rules = section[1].split("\n");

            for(const map_rule of map_rules) {
                const [ dest, src, length ] = map_rule.split(" ").map(Number);

                this.rules.set(map_header, [...(this.rules.get(map_header) ?? []), {
                    src_start: src,
                    src_end: src + length,
                    dest_start: dest
                }]);
            }
        }
    }

    public static solve(): number {
        this.prepare();

        let lowest_loc = Infinity;

        for(const seed of this.seeds) {
            let src = seed;
            rules_loop: for(const ranges of this.rules.values()) {
                for(const range of ranges) {
                    if(src >= range.src_start && src <= range.src_end) {
                        src = range.dest_start + (src - range.src_start);
                        continue rules_loop;
                    }
                }
            }

            lowest_loc = lowest_loc > src ? src : lowest_loc;
        }

        return lowest_loc;
    }
}
