import { Knex } from "knex"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("movie_revenues").del()

    // Inserts seed entries
    await knex("movie_revenues").insert([
        { movie_id: "45", domestic_takings: 22.2, international_takings: 1.3 },
        {
            movie_id: "13",
            domestic_takings: 199.4,
            international_takings: 201.2,
        },
        {
            movie_id: "23",
            domestic_takings: "102.1",
            international_takings: null,
        },
        {
            movie_id: "44",
            domestic_takings: "158.7",
            international_takings: null,
        },
        {
            movie_id: "1",
            domestic_takings: "27.1",
            international_takings: null,
        },
        { movie_id: "53", domestic_takings: null, international_takings: null },
        {
            movie_id: "18",
            domestic_takings: "260.3",
            international_takings: "210.9",
        },
        {
            movie_id: "39",
            domestic_takings: "28.1",
            international_takings: null,
        },
        {
            movie_id: "35",
            domestic_takings: "461.2",
            international_takings: "314.2",
        },
        {
            movie_id: "2",
            domestic_takings: "83.4",
            international_takings: null,
        },
        {
            movie_id: "21",
            domestic_takings: "19.6",
            international_takings: null,
        },
        {
            movie_id: "36",
            domestic_takings: "290.3",
            international_takings: "247.8",
        },
        {
            movie_id: "43",
            domestic_takings: "44.1",
            international_takings: null,
        },
        {
            movie_id: "29",
            domestic_takings: "23.1",
            international_takings: null,
        },
        {
            movie_id: "4",
            domestic_takings: "33.3",
            international_takings: null,
        },
        {
            movie_id: "37",
            domestic_takings: "309.1",
            international_takings: "166.2",
        },
        {
            movie_id: "49",
            domestic_takings: "180.1",
            international_takings: "177.3",
        },
        {
            movie_id: "14",
            domestic_takings: "46.6",
            international_takings: null,
        },
        {
            movie_id: "11",
            domestic_takings: "330.3",
            international_takings: "348.1",
        },
        {
            movie_id: "28",
            domestic_takings: "107.9",
            international_takings: "106.2",
        },
        { movie_id: "19", domestic_takings: null, international_takings: null },
        {
            movie_id: "50",
            domestic_takings: "192.1",
            international_takings: "182.4",
        },
        { movie_id: "5", domestic_takings: null, international_takings: null },
        {
            movie_id: "41",
            domestic_takings: "64.1",
            international_takings: "200.3",
        },
        {
            movie_id: "48",
            domestic_takings: "659.2",
            international_takings: "1528.1",
        },
        {
            movie_id: "30",
            domestic_takings: "16.9",
            international_takings: null,
        },
        {
            movie_id: "10",
            domestic_takings: "55.7",
            international_takings: "106.3",
        },
        {
            movie_id: "12",
            domestic_takings: "188.2",
            international_takings: "273.4",
        },
        {
            movie_id: "9",
            domestic_takings: "128.1",
            international_takings: "85.1",
        },
        { movie_id: "3", domestic_takings: null, international_takings: null },
        {
            movie_id: "17",
            domestic_takings: "2.9",
            international_takings: "10.2",
        },
        {
            movie_id: "34",
            domestic_takings: "11.1",
            international_takings: "265.4",
        },
        {
            movie_id: "31",
            domestic_takings: "404.1",
            international_takings: "418.1",
        },
        {
            movie_id: "6",
            domestic_takings: "8.2",
            international_takings: "23.5",
        },
        {
            movie_id: "16",
            domestic_takings: "11.1",
            international_takings: "82.5",
        },
        {
            movie_id: "32",
            domestic_takings: "374.1",
            international_takings: "410.4",
        },
        {
            movie_id: "25",
            domestic_takings: "1.1",
            international_takings: "13.8",
        },
        {
            movie_id: "51",
            domestic_takings: "71.2",
            international_takings: "62.5",
        },
        {
            movie_id: "26",
            domestic_takings: "37.8",
            international_takings: "46.4",
        },
        {
            movie_id: "42",
            domestic_takings: "11.3",
            international_takings: "66.1",
        },
        {
            movie_id: "33",
            domestic_takings: "337",
            international_takings: "554",
        },
        {
            movie_id: "40",
            domestic_takings: "11.9",
            international_takings: "23.2",
        },
        {
            movie_id: "46",
            domestic_takings: "39.9",
            international_takings: "35.8",
        },
        {
            movie_id: "7",
            domestic_takings: "0.3",
            international_takings: "2.2",
        },
        {
            movie_id: "20",
            domestic_takings: "2.1",
            international_takings: "9.1",
        },
        {
            movie_id: "52",
            domestic_takings: "107.5",
            international_takings: "77.5",
        },
        {
            movie_id: "27",
            domestic_takings: "15.1",
            international_takings: "186.7",
        },
        { movie_id: "8", domestic_takings: null, international_takings: null },
        {
            movie_id: "24",
            domestic_takings: "2.4",
            international_takings: "7.1",
        },
        {
            movie_id: "38",
            domestic_takings: "0.5",
            international_takings: "0.4",
        },
        {
            movie_id: "22",
            domestic_takings: "124.9",
            international_takings: "484.1",
        },
        {
            movie_id: "15",
            domestic_takings: "59.3",
            international_takings: "115.5",
        },
        {
            movie_id: "47",
            domestic_takings: "54.5",
            international_takings: "104.7",
        },
    ])
}
