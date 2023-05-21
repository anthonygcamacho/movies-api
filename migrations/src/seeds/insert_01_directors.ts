import { Knex } from "knex"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("directors").del()

    // Inserts seed entries
    await knex("directors").insert([
        {
            first_name: "Tomas",
            last_name: "Alfredson",
            date_of_birth: "1965-04-01",
            nationality: "Swedish",
        },
        {
            first_name: "Paul",
            last_name: "Anderson",
            date_of_birth: "1970-06-26",
            nationality: "American",
        },
        {
            first_name: "Wes",
            last_name: "Anderson",
            date_of_birth: "1969-05-01",
            nationality: "American",
        },
        {
            first_name: "Richard",
            last_name: "Ayoade",
            date_of_birth: "1977-06-12",
            nationality: "British",
        },
        {
            first_name: "Luc",
            last_name: "Besson",
            date_of_birth: "1959-03-18",
            nationality: "French",
        },
        {
            first_name: "James",
            last_name: "Cameron",
            date_of_birth: "1954-08-16",
            nationality: "American",
        },
        {
            first_name: "Guillermo",
            last_name: "del Toro",
            date_of_birth: "1964-10-09",
            nationality: "Mexican",
        },
        {
            first_name: "Victor",
            last_name: "Fleming",
            date_of_birth: "1889-02-23",
            nationality: "American",
        },
        {
            first_name: "Francis",
            last_name: "Ford Coppola",
            date_of_birth: "1939-04-07",
            nationality: "American",
        },
        {
            first_name: "Kinji",
            last_name: "Fukasaku",
            date_of_birth: "1930-07-03",
            nationality: "Japanese",
        },
        {
            first_name: "Florian ",
            last_name: "Henckel von Donnersmarck",
            date_of_birth: "1973-05-02",
            nationality: "German",
        },
        {
            first_name: "Terry",
            last_name: "Jones",
            date_of_birth: "1942-02-01",
            nationality: "British",
        },
        {
            first_name: "Stanley",
            last_name: "Kubrick",
            date_of_birth: "1928-07-26",
            nationality: "American",
        },
        {
            first_name: "John",
            last_name: "Lasseter",
            date_of_birth: "1957-01-12",
            nationality: "American",
        },
        {
            first_name: "Ang",
            last_name: "Lee",
            date_of_birth: "1954-10-23",
            nationality: "Chinese",
        },
        {
            first_name: "Bruce",
            last_name: "Lee",
            date_of_birth: "1940-11-27",
            nationality: "Chinese",
        },
        {
            first_name: "George",
            last_name: "Lucas",
            date_of_birth: "1944-05-14",
            nationality: "American",
        },
        {
            first_name: "Martin",
            last_name: "McDonagh",
            date_of_birth: "1970-03-26",
            nationality: "British",
        },
        {
            first_name: "James",
            last_name: "McTeigue",
            date_of_birth: "1967-12-29",
            nationality: "Australian",
        },
        {
            first_name: "Fernando",
            last_name: "Meirelles",
            date_of_birth: "1955-11-09",
            nationality: "Brazilian",
        },
        {
            first_name: "Hayao ",
            last_name: "Miyazaki",
            date_of_birth: "1941-01-05",
            nationality: "Japanese",
        },
        {
            first_name: "Paulo",
            last_name: "Morelli",
            date_of_birth: "1966-03-10",
            nationality: "Brazilian",
        },
        {
            first_name: "Chan-wook",
            last_name: "Park",
            date_of_birth: "1963-08-23",
            nationality: "South Korean",
        },
        {
            first_name: "Sam",
            last_name: "Raimi",
            date_of_birth: "1959-10-23",
            nationality: "American",
        },
        {
            first_name: "Mark",
            last_name: "Romanek",
            date_of_birth: "1959-09-18",
            nationality: "American",
        },
        {
            first_name: "Martin",
            last_name: "Scorsese",
            date_of_birth: "1942-11-17",
            nationality: "American",
        },
        {
            first_name: "Ridley",
            last_name: "Scott",
            date_of_birth: "1937-11-30",
            nationality: "British",
        },
        {
            first_name: "Tony",
            last_name: "Scott",
            date_of_birth: "1944-06-21",
            nationality: "British",
        },
        {
            first_name: "Zack",
            last_name: "Snyder",
            date_of_birth: "1966-03-01",
            nationality: "American",
        },
        {
            first_name: "Sion",
            last_name: "Sono",
            date_of_birth: "1961-12-18",
            nationality: "Japanese",
        },
        {
            first_name: "Steven",
            last_name: "Spielberg",
            date_of_birth: "1946-12-18",
            nationality: "American",
        },
        {
            first_name: "Robert",
            last_name: "Stevenson",
            date_of_birth: "1905-03-31",
            nationality: "British",
        },
        {
            first_name: "Quentin",
            last_name: "Tarantino",
            date_of_birth: "1963-03-27",
            nationality: "American",
        },
        {
            first_name: "Robert",
            last_name: "Wise",
            date_of_birth: "1914-09-10",
            nationality: "American",
        },
        {
            first_name: "Kar Wai",
            last_name: "Wong",
            date_of_birth: "1958-07-17",
            nationality: "Chinese",
        },
        {
            first_name: "Robert",
            last_name: "Zemeckis",
            date_of_birth: "1952-05-14",
            nationality: "American",
        },
        {
            first_name: "Yimou",
            last_name: "Zhang",
            date_of_birth: "1950-04-02",
            nationality: "Chinese",
        },
    ])
}
