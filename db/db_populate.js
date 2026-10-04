const { Client } = require('pg');

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    await client.connect();

    await client.query(
        `INSERT INTO genre (name) VALUES 
        ('Sports'),
        ('Action-Adventure'),
        ('RPG'),
        ('Shooter');

        INSERT INTO publisher (company_name, founding_date, headquarters) VALUES 
        ('Sony Interactive Entertainment', '1993-11-16', 'San Mateo, USA'),
        ('Activision', '1979-10-01', 'Santa Monica, USA'),
        ('Electronic Arts', '1982-05-27', 'Redwood City, USA');

        INSERT INTO game (title, release_date, description, genre_name, publisher_name, image_url) VALUES 
        ('Marvel''s Spider-Man 2', '2023-10-20', 'Peter Parker and Miles Morales face the ultimate test to save the city from Venom and the symbiote threat.', 'Action-Adventure', 'Sony Interactive Entertainment', '/97e9f5fa6e50c185d249956c6f198a2652a9217e69a59ecd.jpg'),
        ('Call of Duty: Infinite Warfare', '2016-11-04', 'A futuristic first-person shooter featuring zero-gravity infantry combat, space fighter dogfights, and a campaign defending Earth from the Settlement Defense Front.', 'Shooter', 'Activision', '/DEjSIXJr34PEZC75zH2aWony.avif'),
        ('EA Sports FC 24', '2023-09-29', 'A new era for football simulation featuring 19,000+ fully licensed players.', 'Sports', 'Electronic Arts', '/fc-24-hero.webp'),
        ('Helldivers 2', '2024-02-08', 'A squad-based cooperative shooter where players fight for freedom across a hostile galaxy.', 'Shooter', 'Sony Interactive Entertainment', '/helldivers-2-devoid-of-liberty-hero-desktop-03-4aug26.webp');

        INSERT INTO platform (platform_name, game_id) VALUES 
        ('PlayStation 5', 1),
        ('PC', 2),
        ('PlayStation 4', 2),
        ('Xbox One', 2),
        ('PlayStation 5', 3),
        ('Xbox Series X/S', 3),
        ('PC', 3),
        ('Nintendo Switch', 3),
        ('PlayStation 5', 4),
        ('PC', 4);`
    );

    await client.end();
}

main();