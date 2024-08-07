-- Active: 1722729972892@@127.0.0.1@5432@eventos

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
    img_url VARCHAR (255) NOT NULL,
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
('admin@example.com', 'adminpassword', 'admin', 'path/to/adminpicture.jpg', TRUE);

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