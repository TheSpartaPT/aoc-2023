import { data } from "./input";

export class Solution_D4_P1 {
    public static solve(): number {
        let acc = 0;

        for(const card of data.split("\n")) {
            const colon_split = card.split(/\:\s+/);

            const number_sets = colon_split[1].split(/\s\|\s+/);
            const winning_numbers = new Set(number_sets[0].split(/\s+/).map(Number));
            const card_numbers = new Set(number_sets[1].split(/\s+/).map(Number));

            let card_matches = 0;

            for(const card_number of card_numbers) {
                if(winning_numbers.has(card_number)) {
                    card_matches++;
                }
            }

            acc += card_matches > 0 ? 2 ** (card_matches - 1) : 0;
        }

        return acc;
    }
}
