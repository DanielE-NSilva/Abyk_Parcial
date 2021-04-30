CREATE SCHEMA `ingresocovid`;

use `ingresocovid` ;

CREATE TABLE IF NOT EXISTS  areafacultad(
    CodFacultad VARCHAR(3) NOT NULL,
    NombreFacultad VARCHAR(100) NOT NULL,
    PRIMARY KEY (CodFacultad)
);

CREATE TABLE  IF NOT EXISTS programa(
    CodPrograma NUMERIC(6,0) NOT NULL,
    NombrePrograma VARCHAR(100) NOT NULL,
    CodFacultad VARCHAR(3) NOT NULL,
    PRIMARY KEY (CodPrograma),
    FOREIGN KEY (CodFacultad)
        REFERENCES AreaFacultad (CodFacultad) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS planAcademico(
    CodPlanAcademico NUMERIC(4,0) NOT NULL,
    CodPrograma NUMERIC(6,0) NOT NULL,
    PRIMARY KEY (CodPlanAcademico),
    FOREIGN KEY (CodPrograma)
        REFERENCES Programa (CodPrograma) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS Empleados(
    NroDocumentoEmpleado NUMERIC(14,0) NOT NULL,
    NombreCompletoEmpleado VARCHAR(50) NOT NULL,
    AreaFacultad VARCHAR(3) NOT NULL,
    CargoEmpleado VARCHAR(50) NOT NULL,
    EmailEmpleado VARCHAR(50) NOT NULL,
    PRIMARY KEY (NroDocumentoEmpleado),
    FOREIGN KEY (AreaFacultad)
        REFERENCES AreaFacultad (CodFacultad) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS Docentes(
    NroDocumentoDocentes NUMERIC(14,0) NOT NULL,
    TipoDeDocumento VARCHAR(2) NOT NULL,
    NombreCompletoDocente VARCHAR(50) NOT NULL,
    EmailDocente VARCHAR(50) NOT NULL,
    CodPrograma NUMERIC(6,0) NOT NULL,
    TipoDocente VARCHAR(30) NOT NULL,
    PRIMARY KEY (NroDocumentoDocentes),
    FOREIGN KEY (CodPrograma)
    REFERENCES Programa (CodPrograma) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS Estudiantes(
    NroDocumentoEstudiante NUMERIC(14,0) NOT NULL,
    NombreEstudiante VARCHAR(50) NOT NULL,
    ApellidoUnoEstudiante VARCHAR(50) NOT NULL,
    ApellidoDosEstudiante VARCHAR(50) NOT NULL,
    PlanAcademico NUMERIC(4,0) NOT NULL,
    EmailEstudiante VARCHAR(50) NOT NULL,
    PRIMARY KEY (NroDocumentoEstudiante),
    FOREIGN KEY (PlanAcademico)
        REFERENCES PlanAcademico (CodPlanAcademico) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS Familia(
	Id INT4 AUTO_INCREMENT PRIMARY KEY,
    NroDocumento NUMERIC(14)  NOT NULL,
    parentesco VARCHAR(50) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    fechaNacimiento VARCHAR (15),
    Genero VARCHAR(50),
    TipoEstudio VARCHAR(50)
);


INSERT INTO AreaFacultad
	(CodFacultad, NombreFacultad)
	VALUES
	('ADM','Administración'),
	('CAG','Ciencias Agrarias'),
	('CBS','Ciencias Basicas, Sociales y Humanas'),
	('CAV','Comunicacion Audiovisual'),
	('EFD','Educacion Fisica, Recreacion y Deporte'),
	('ING','Ingenieria'),
	('ADF','Administrativa Financiera'),
	('AGH','Administrativa Gestion Humanas'),
	('ABI','Administrativa Bienestar Institucional'),
	('AIC','Administrativa Informatica Corporativa'),
	('AAQ','Administrativa Aquisiciones'),
	('CSB','Coordinación Sistema de Bibliotecas'),
	('ATU','Atención al Usuario'),
	('CYP','Circulación y Préstamo'),
	('GDC','Gestión de Colecciones'),
	('CAP','Coordinación de Admisiones y Programación Académica'),
	('DIN','Directorio Investigación'),
	('CLP','Coordinación Centro de Laboratorios, Prácticas y Experimentación'),
	('DVP','Docentes Vinculado o Provicionales');

INSERT INTO Programa
	(CodPrograma, NombrePrograma, CodFacultad)
	VALUES
	(1749,'Tecnólogo en costos y auditoría','ADM'),
	(101952,'Tecnólogo en Gestión Aeroportuaria','ADM'),
	(103880,'Tecnólogo en Gestión de Empresas y Destinos Turísticos','ADM'),
	(103305,'Tecnólogo en Gestión Industrial','ADM'),
	(101886,'Tecnólogo en Gestión Pública','ADM'),
	(1755,'Tecnólogo Industrial','ADM'),
	(103065,'Tecnólogo en Logística Integral','ADM'),
	(106240,'Tecnólogo en Gestión Logística Integral','ADM'),
	(108602,'Administrador Público','ADM'),
	(2540,'Contador Público','ADM'),
	(2937,'Ingeniero de Productividad y Calidad','ADM'),
	(54963,'Especialista en Finanzas Públicas','ADM'),
	(103464,'Especialista en Gerencia Financiera','ADM'),
	(9567,'Especialista en Gerencia Integral','ADM'),
	(2859,'Tecnólogo Agropecuario','CAG'),
	(4206,'Administrador de Empresas Agropecuarias','CAG'),
	(5243,'Ingeniero Agropecuario','CAG'),
	(108243,'Especialista en Biotecnología de la Reproducción Animal','CAG'),
	(108254,'Especialista en Gerencia de Agronegocios','CAG'),
	(106852,'Magíster en Gerencia de Empresas Pecuarias','CAG'),
	(102621,'Tecnólogo en Química Industrial y de Laboratorio','CBS'),
	(21549,'Tecnólogo en Producción de Eventos','CAV'),
	(3983,'Tecnólogo en Producción de Televisión','CAV'),
	(55167,'Comunicador Audiovisual','CAV'),
	(53460,'Magíster en Comunicación Educativa','CAV'),
	(54149,'Técnico Profesional en Masoterapia','EFD'),
	(108727,'Licenciado en Educación Física, Recreación y Deportes','EFD'),
	(3729,'Profesional en Deporte','EFD'),
	(53588,'Técnico Profesional en Programación de Sistemas de Información','ING'),
	(1751,'Tecnólogo en Construcciones Civiles','ING'),
	(105388,'Tecnólogo en Construcciones Civiles -Rionegro','ING'),
	(102933,'Tecnólogo en Infraestructura de Telecomunicaciones','ING'),
	(1752,'Tecnólogo en Instrumentación Industrial','ING'),
	(2714,'Tecnólogo en Seguridad e Higiene Ocupacional','ING'),
	(108246,'Tecnólogo en Desarrollo de Software','ING'),
	(53587,'Tecnólogo en Sistematización de Datos','ING'),
	(3689,'Ingeniero Civil','ING'),
	(108270,'Ingeniero en Seguridad y Salud en el Trabajo','ING'),
	(2541,'Ingeniero en Instrumentación y Control','ING'),
	(3348,'	Ingeniero Informático','ING'),
	(102595,'Especialista en Higiene Ocupacional y Ambiental','ING'),
	(103871,'Magíster en Gestión Integral del Riesgo Laboral','ING'),
	(105892,'Magíster en Ingeniería','ING');

INSERT INTO PlanAcademico
	(CodPlanAcademico, CodPrograma)
	VALUES
(9701,4206),	 (4112,9567),	 (8202,3348),	 (0104,1751),	 (0409,1752),
(9702,4206),	 (4113,9567),	 (8208,3348),	 (0108,1751),	 (0410,1752),
(9708,4206),	 (4910,102595),	 (8209,3348),	 (0109,1751),	 (6610,103065),
(9709,4206),	 (9201,2937),	 (8210,3348),	 (0111,1751),	 (7010,21549),
(9710,4206),	 (9202,2937),	 (3009,3348),	 (0112,1751),	 (1909,3983),
(8810,108602),	 (9208,2937),	 (2609,3348),	 (0113,1751),	 (1910,3983),
(2009,55167),	 (9209,2937),	 (7510,108727),	 (0110,1751),	 (1901,3983),
(2010,55167),	 (9210,2937),	 (5510,106852),	 (0302,1749),	 (1902,3983),
(2008,55167),	 (9204,2937),	 (5410,105892),	 (0303,1749),	 (1908,3983),
(9001,2540),	 (8601,5243),	 (8001,3729),	 (0308,1749),	 (0601,1755),
(9008,2540),	 (8608,5243),	 (8003,3729),	 (0309,1749),	 (0602,1755),
(9009,2540),	 (8609,5243),	 (8004,3729),	 (0310,1749),	 (0603,1755),
(9010,2540),	 (8610,5243),	 (8008,3729),	 (3801,1749),	 (0608,1755),
(9011,2540),	 (9502,3689),	 (8009,3729),	 (6910,108246),	 (0609,1755),
(9005,2540),	 (9508,3689),	 (2510,54149),	 (6210,101952),	 (0501,53587),
(9004,2540),	 (9509,3689),	 (2511,54149),	 (6211,101952),	 (0502,53587),
(9003,2540),	 (9510,3689),	 (2310,53588),	 (6710,103880),	 (0508,53587),
(9002,2540),	 (9511,3689),	 (2311,53588),	 (6310,103305),	 (0509,53587),
(9007,2540),	 (9501,3689),	 (2312,53588),	 (6810,106240),	 (2410,53587),
(9006,2540),	 (2209,3689),	 (2352,53588),	 (3710,101886),	 (2411,53587),
(5610,108243),	 (2210,3689),	 (6010,53588),	 (3712,101886),	 (2412,53587),
(4710,54963),	 (9101,2541),	 (0201,2859),	 (3711,101886),	 (1101,2714),
(4711,54963),	 (9102,2541),	 (0203,2859),	 (3709,101886),	 (1102,2714),
(5710,108254),	 (9103,2541),	 (0208,2859),	 (6510,102933),	 (1107,2714),
(5110,103464),	 (9104,2541),	 (0209,2859),	 (0402,1752),	 (1108,2714),
(4109,9567),	 (9108,2541),	 (0210,2859),	 (0403,1752),	 (1109,2714),
(4110,9567),	 (9109,2541),	 (0101,1751),	 (0404,1752),	 (1110,2714),
(4111,9567),	 (8710,108270),	 (0102,1751),	 (0408,1752),	 (1106,2714),
(6410,102621);

INSERT INTO Empleados
	(NroDocumentoEmpleado, NombreCompletoEmpleado, AreaFacultad, CargoEmpleado, EmailEmpleado)
	VALUES
(7665821773,'Luz Miram Isaza Cifuentes','AGH','Auxiliar De Servicios Asistenciales','lmisaza@elpoli.edu.co'),
(3531000305,'Jaime Leon Acevedo Vergara','ADM','Tecnico Administrativo','jlacevedo@elpoli.edu.co'),
(2082664233,'AURA MARCELA MESA','AGH','Auxiliar Administrativo Asistente administrativo','ammesa@elpoli.edu.co'),
(5285455303,'CLAUDIA PATRICIA GONZALEZ','ABI','Auxiliar Area Salud Adjunto tercero','cpgonzalez@elpoli.edu.co'),
(5578559646,'ELIZABETH FERNANDEZ JIMEMEZ','ADM','Auxiliar Administrativa','efernandez@elpoli.edu.co'),
(7448576305,'Ginna Usuga Arango','ADM','Auxiliar De Servicios Generales','ginnausuga@elpoli.edu.co');

INSERT INTO Docentes
(NroDocumentoDocentes, TipoDeDocumento, NombreCompletoDocente, EmailDocente, CodPrograma, TipoDocente)
	VALUES
(8683120294,'CC','Ricardo Leon Isaza David','rlisaza@elpoli.edu.co',3348,'Docente Vinculado'),
(8846143079,'CC','Jaime Alejandro Montoya Brand','jamontoya@elpoli.edu.co',103305,'Docente Temperal'),
(3550978265,'CC','Jaime Alonso Vásquez Peláez','javasquez@elpoli.edu.co',2540,'Docente Vinculado'),
(8318412364,'CC','Alexander Tapia Morales','alexandertapia@elpoli.edu.co ',53588,'Docente Temperal'),
(8540378248,'CC','Donaldo Cardona Nieto','donaldocardona@elpoli.edu.co ',108727,'Docente Vinculado'),
(7433470458,'CC','Miriam Gómez Marín','mgomez@elpoli.edu.co',102595,'Docente Temperal');

INSERT INTO Estudiantes
(NroDocumentoEstudiante, NombreEstudiante, ApellidoUnoEstudiante, ApellidoDosEstudiante, PlanAcademico, EmailEstudiante)
	VALUES
(1026160556,'Juliana','Florez','Soto',8210,'juliana_florez82161@elpoli.edu.co'),
(1017274238,'Valentina','Restrepo','Castrillon',8210,'Valentina_restrepo82172@elpoli.edu.co'),
(1017257382,'Daniel Esteban','Nuñez','Silva',8210, 'daniel_nunez82181@elpoli.edu.co');