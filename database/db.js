import {Client}  from "https://deno.land/x/postgres@v0.13.0/mod.ts";

export const client = new Client({
    //hostname: "test2.vivago.com",
    hostname: "127.0.0.1",    
    database: "vivago",
    user: "vivagoadmin",
    password: "vivagoadmin",   
    port: 5432,
  });

