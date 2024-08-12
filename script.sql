-- Active: 1723431204835@@dpg-cqpvbfd6l47c73al4qtg-a.oregon-postgres.render.com@5432@eventos_tnx7

-- Crear la Base de Datos
CREATE DATABASE eventos;


-- Usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	is_admin BOOLEAN DEFAULT FALSE
);

-- Eventos
CREATE TABLE eventos (
    event_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    ticket_price NUMERIC(10, 2) NOT NULL,
    tickets_available INT NOT NULL,
    img_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

SELECT * FROM users;

select * from eventos;

select * from usuarios;

-- Entradas
CREATE TABLE ticket (
    ticket_id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES eventos(event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Favoritos
CREATE TABLE favorite (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES eventos(event_id)
);

-- Carrito de Compra
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES eventos(event_id)
);


-- Insertar el usuario administrador
INSERT INTO users (email, password, username, profile_picture, is_admin) VALUES
('Juan.pinto37@gmail.com', 12345,'admin','data:image/jpeg;base64,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',
   true);

-- Insertar usuarios
INSERT INTO users (email, password, username, profile_picture) VALUES
('user1@example.com', 'password1', 'user1', 'path/to/picture1.jpg'),
('user2@example.com', 'password2', 'user2', 'path/to/picture2.jpg'),
('user3@example.com', 'password3', 'user3', 'path/to/picture3.jpg'),
('user4@example.com', 'password4', 'user4', 'path/to/picture4.jpg');

-- Insertar eventos
INSERT INTO eventos (user_id, title, description, date, location, ticket_price, tickets_available) VALUES
(1, 'Evento 1', 'Descripción del Evento 1', '2024-07-10 20:00:00', 'Santiago', 1000, 0), -- agotado
(1, 'Evento 2', 'Descripción del Evento 2', '2024-08-15 20:00:00', 'Valparaíso', 1000, 40),
(1, 'Evento 3', 'Descripción del Evento 3', '2024-09-20 20:00:00', 'Concepción', 1000, 40),
(1, 'Evento 4', 'Descripción del Evento 4', '2024-10-25 20:00:00', 'La Serena', 1000, 40),
(2, 'Evento 5', 'Descripción del Evento 5', '2024-07-12 20:00:00', 'Santiago', 2500, 19), -- mitad agotado
(4, 'Evento 6', 'Descripción del Evento 6', '2024-07-30 20:00:00', 'Antofagasta', 4000, 200); -- sin ventas

-- Insertar entradas (tickets) que simulan tickets comprados por usuario
INSERT INTO ticket (event_id, user_id) VALUES
(1, 1), (1, 1), (1, 1), -- repetir hasta 40 veces para simular agotamiento
(5, 2), (5, 2), (5, 2), -- repetir hasta 19 veces
(2, 3), (3, 3), (4, 3); -- usuario 3 asistiendo a 3 eventos

-- Insertar favoritos
INSERT INTO favorite (user_id, event_id) VALUES
(1, 2), (1, 3), -- favoritos del usuario 1
(3, 1), (3, 2), (3, 3), (3, 4); -- 4 favoritos del usuario 3