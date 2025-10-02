--1. Create the Countries table to store data fetched from the REST Countries API.

CREATE TABLE Countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- Country name is unique
    capital VARCHAR(100),
    flag_url TEXT,                     -- URL for the country's flag image
    subregion VARCHAR(100),
    population BIGINT                  -- Use BIGINT for large population numbers
);
