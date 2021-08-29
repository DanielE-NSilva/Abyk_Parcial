DROP DATABASE abyk;

CREATE DATABASE Abyk;
USE abyk;

CREATE TABLE persona(
  Correo VARCHAR(45) NOT NULL,
  Contraseña VARCHAR(65) NOT NULL,
  Perfil TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (Correo),
  UNIQUE INDEX Correo_UNIQUE (Correo ASC) VISIBLE
  );

CREATE TABLE administrador(
	IdAdministrador INT AUTO_INCREMENT,
	Correo VARCHAR(45) NOT NULL,
    Nombre VARCHAR(45) NOT NULL,
	Apellido VARCHAR(45) NOT NULL,
    PRIMARY KEY (IdAdministrador),
    FOREIGN KEY (Correo) REFERENCES persona(Correo),
	UNIQUE INDEX IdAdministrador_UNIQUE (IdAdministrador ASC) VISIBLE
);

CREATE TABLE cliente(
	IdCliente INT AUTO_INCREMENT,
	Correo VARCHAR(45) NOT NULL,
	Nombre VARCHAR(45) NOT NULL,
	Apellido VARCHAR(45) NOT NULL,
	Telefono INT NULL,
	PRIMARY KEY (IdCliente),
    FOREIGN KEY (Correo) REFERENCES persona(Correo),
	UNIQUE INDEX IdCliente_UNIQUE (IdCliente ASC) VISIBLE
);

CREATE TABLE producto(
	IdProducto INT AUTO_INCREMENT,
	NombreImagen VARCHAR(45) NOT NULL,
	Nombre VARCHAR(45) NOT NULL,
	Descripcion VARCHAR(150) NOT NULL,
	Caracteristicas VARCHAR(150) NOT NULL,
	Referencia VARCHAR(150) NOT NULL,
    Cantidad INT NOT NULL,
    Categoria TINYINT NOT NULL,
	PRIMARY KEY (IdProducto),
	UNIQUE INDEX IdProducto_UNIQUE (IdProducto ASC) VISIBLE
);
