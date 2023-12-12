import { data } from "./input";

export class Solution_D2_P1 {
	public static solve(): number {
		let sum = 0;

		const max_cubes = new Map([
			["red", 12],
			["green", 13],
			["blue", 14]
		]);

		game_loop: for(const game of data.split("\n")) {
			const colon_split = game.split(": ");

			const game_id = Number(colon_split[0].split(" ")[1]);

			const cube_sets = colon_split[1].split("; ");
			for(const cube_set of cube_sets) {
				const cubes = cube_set.split(", ");
				for(const cube of cubes) {
					const cube_props = cube.split(" ");
					const cube_count = Number(cube_props[0]);
					const cube_color = cube_props[1];

					if(cube_count > max_cubes.get(cube_color)!) {
						continue game_loop;
					}
				}
			}

			sum += game_id;
		}

		return sum;
	}
}
