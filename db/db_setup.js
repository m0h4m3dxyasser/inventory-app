const { Client } = require('pg');

async function main() {
    const client = new Client({
    connectionString: process.env.DATABASE_URL
    });

    await client.connect();

    await client.query(
        `CREATE TABLE genre (
            name VARCHAR(30) PRIMARY KEY
        );

        CREATE TABLE publisher (
            company_name VARCHAR(50) PRIMARY KEY,
            founding_date DATE,
            headquarters VARCHAR(20)
        );
        
        CREATE TABLE game (
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            title VARCHAR(100) NOT NULL,
            release_date DATE,
            description TEXT,
            genre_name VARCHAR(30) REFERENCES genre(name),
            publisher_name VARCHAR(50) REFERENCES publisher(company_name),
            image_url VARCHAR
        );

        CREATE TABLE platform (
            platform_name VARCHAR(20),
            game_id INT REFERENCES game(id),
            PRIMARY KEY (platform_name, game_id)
        );`
    );

    await client.end();
}

main();