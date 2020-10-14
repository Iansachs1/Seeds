{
    "development": {
        "username": "root",
        "password": "root",
        "database": "seeds_db",
        "port": 3306,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": "root",
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USER || "root",
        "password": process.env.password || "root",
        "database": process.env.database || "database_production",
        "host": process.env.host || "127.0.0.1",
        "dialect": "mysql"
    }
}