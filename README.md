# Inventory App

My third project applying what I've learned so far following The Odin Porject.

This one focused on different database actions while implementing an inventory that holds game information. The MVC pattern is fulfilled, relevant routes are organized, actions are carried out through a single shared connection pool, and pages are rendered server-side using the EJS template engine.

What distinguishes this project, aside from covering all database actions, is its appealing look. In the project outline, it was explicitly stated to make it pretty. Thus, I honed my CSS skills to introduce this masterpiece, which took up most of the time and caused the delay between this project and the last one.

Finally, all destructive actions are placed behind a protection wall to preserve the integrity of the information, such that an admin password must be provided and validated before carrying out any of them.

> [!NOTE]
> The database setup and population scripts are provided under `"scripts"` in `package.json` as `"db:setup"` and `"db:populate"` for setting up and populating the database, respectively. A `.env` file containing the database connection URL defined as `DATABASE_URL` and the admin password defined as `ADMIN_PASSWORD` is required for the project to run successfully.