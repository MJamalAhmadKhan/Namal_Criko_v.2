USE namalcriko;

-- Clean up existing simulations if any
DELETE FROM CRICKET_SIMULATION WHERE simulation_name IN (
  'Simulation 1', 'Simulation 2', 'Simulation 3', 'Simulation 4', 'Simulation 5',
  'Simulation 6', 'Simulation 7', 'Simulation 8', 'Simulation 9', 'Simulation 10',
  'Simulation 11', 'Simulation 12', 'Simulation 13', 'Simulation 14', 'Simulation 15'
);

-- Insert Simulation 1
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 1', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/1.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 1 Drill","frames":[{"id":"f-sim1-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim1-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 2
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 2', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/2.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 2 Drill","frames":[{"id":"f-sim2-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim2-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 3
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 3', 120, 2);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/3.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 3 Drill","frames":[{"id":"f-sim3-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim3-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 4
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 4', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/4.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 4 Drill","frames":[{"id":"f-sim4-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim4-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 5
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 5', 120, 2);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/5.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 5 Drill","frames":[{"id":"f-sim5-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim5-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 6
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 6', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/6.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 6 Drill","frames":[{"id":"f-sim6-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim6-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 7
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 7', 120, 2);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/7.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 7 Drill","frames":[{"id":"f-sim7-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim7-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 8
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 8', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/8.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 8 Drill","frames":[{"id":"f-sim8-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim8-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 9
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 9', 120, 2);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/9.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 9 Drill","frames":[{"id":"f-sim9-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim9-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 10
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 10', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/10.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 10 Drill","frames":[{"id":"f-sim10-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim10-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 11
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 11', 120, 2);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/11.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 11 Drill","frames":[{"id":"f-sim11-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim11-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 12
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 12', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/12.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 12 Drill","frames":[{"id":"f-sim12-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim12-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 13
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 13', 120, 2);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/13.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 13 Drill","frames":[{"id":"f-sim13-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim13-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 14
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 14', 120, 1);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/14.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 14 Drill","frames":[{"id":"f-sim14-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim14-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- Insert Simulation 15
INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES ('Simulation 15', 120, 2);
SET @sim_id = LAST_INSERT_ID();
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Video', 'Simulations/15.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (@sim_id, 'Text', '{"description":"Simulation 15 Drill","frames":[{"id":"f-sim15-1","description":"Stance & Setup","keyPoints":["Balance stance","Eyes level"]},{"id":"f-sim15-2","description":"Ball Impact","keyPoints":["Watch contact","Soft grip"]}]}');

-- ################# SEEDING_START #################

USE namalcriko;

-- Clear existing data in correct dependency order
DELETE FROM CORRECTION;
DELETE FROM SPECIFIC_MISTAKE;
DELETE FROM Asset;
DELETE FROM SIMULATION_LOG;
DELETE FROM CRICKET_SIMULATION;
DELETE FROM Ticket_History;
DELETE FROM Ticket_RESPONSE;
DELETE FROM TICKETS;
DELETE FROM QUOTE_IMPRESSION;
DELETE FROM QUOTE;
DELETE FROM CRICKET_EVENT;
DELETE FROM FAQS;
DELETE FROM Batting_STATISTICS;
DELETE FROM Bowling_STATISTICS;
DELETE FROM PLAYER_STATISTICS;
DELETE FROM Professional_PLAYER;
DELETE FROM STUDENT_PLAYER;
DELETE FROM OTHER_PLAYER;
DELETE FROM Learnig_Streak;
DELETE FROM PLAYER;
DELETE FROM ADMIN;
DELETE FROM USER WHERE email LIKE 'seeding_%' OR email IN ('admin', 'test@namal.edu.pk');
DELETE FROM Ticket_Category;
DELETE FROM Organization;
DELETE FROM Category;

-- Re-seed Organizations
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (1, 'Namal University', 'Punjab', 'Mianwali', 'Pakistan');
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (2, 'COMSATS University', 'Federal', 'Islamabad', 'Pakistan');
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (3, 'UET Lahore', 'Punjab', 'Lahore', 'Pakistan');
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (4, 'LUMS', 'Punjab', 'Lahore', 'Pakistan');
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (5, 'NUST', 'Federal', 'Islamabad', 'Pakistan');
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (6, 'Punjab University', 'Punjab', 'Lahore', 'Pakistan');
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (7, 'Bahria University', 'Federal', 'Islamabad', 'Pakistan');
INSERT INTO Organization (ORGID, Name, Province, City, Country) VALUES (8, 'Air University', 'Federal', 'Islamabad', 'Pakistan');

-- Re-seed Categories
INSERT INTO Category (Category_id, Parent_Category, Difficulty_Level, Name) VALUES (1, null, 1, 'Batting');
INSERT INTO Category (Category_id, Parent_Category, Difficulty_Level, Name) VALUES (2, null, 1, 'Bowling');
INSERT INTO Category (Category_id, Parent_Category, Difficulty_Level, Name) VALUES (3, null, 1, 'General');
INSERT INTO Category (Category_id, Parent_Category, Difficulty_Level, Name) VALUES (4, null, 1, 'Mindset');

-- Re-seed Ticket Categories
INSERT INTO Ticket_Category (Cat_id, Name, Priority_Level) VALUES (1, 'Technical', 2);
INSERT INTO Ticket_Category (Cat_id, Name, Priority_Level) VALUES (2, 'Content', 1);
INSERT INTO Ticket_Category (Cat_id, Name, Priority_Level) VALUES (3, 'Account', 3);

-- Seed Admin User
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (1, 'System', 'Admin', 'admin', '+923001234567', '$2a$10$DqTzki8ydbN7wNba6HPhvOjXCNhoRO0Cl4h30HtPTXd4MTzG1w7T.', CURDATE());
INSERT INTO ADMIN (admin_id) VALUES (1);

-- Seed Test Student Player User
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (2, 'Jamal', 'Ahmad', 'test@namal.edu.pk', '+923007654321', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (2, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (2, 1, 'NUM-BSCS-2024-TEST');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (2, NULL, 0, 0);

-- Seed 20 Players
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (11, 'Muhammad', 'Ali', 'muhammad.ali1@namal.edu.pk', '+923000000001', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (11, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (11, 2, 'REG-NO-001');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (11, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (12, 'Ahmad', 'Khan', 'ahmad.khan2@namal.edu.pk', '+923000000002', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (12, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (12, 3, 'REG-NO-002');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (12, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (13, 'Fatima', 'Zaidi', 'fatima.zaidi3@namal.edu.pk', '+923000000003', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (13, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (13, 4, 'REG-NO-003');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (13, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (14, 'Bilal', 'Shah', 'bilal.shah4@namal.edu.pk', '+923000000004', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (14, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (14, 5, 'REG-NO-004');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (14, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (15, 'Zainab', 'Bibi', 'zainab.bibi5@namal.edu.pk', '+923000000005', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (15, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (15, 6, 'REG-NO-005');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (15, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (16, 'Aisha', 'Omar', 'aisha.omar6@namal.edu.pk', '+923000000006', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (16, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (16, 7, 'REG-NO-006');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (16, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (17, 'Hamza', 'Yusuf', 'hamza.yusuf7@namal.edu.pk', '+923000000007', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (17, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (17, 8, 'REG-NO-007');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (17, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (18, 'Yousuf', 'Raza', 'yousuf.raza8@namal.edu.pk', '+923000000008', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (18, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (18, 1, 'REG-NO-008');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (18, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (19, 'Omar', 'Farooq', 'omar.farooq9@namal.edu.pk', '+923000000009', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (19, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (19, 2, 'REG-NO-009');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (19, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (20, 'Usman', 'Tariq', 'usman.tariq10@namal.edu.pk', '+923000000010', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (20, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (20, 3, 'REG-NO-0010');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (20, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (21, 'Abu', 'Bakar', 'abu.bakar11@namal.edu.pk', '+923000000011', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (21, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (21, 4, 'REG-NO-0011');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (21, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (22, 'Khadija', 'Hassan', 'khadija.hassan12@namal.edu.pk', '+923000000012', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (22, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (22, 5, 'REG-NO-0012');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (22, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (23, 'Maryam', 'Jamil', 'maryam.jamil13@namal.edu.pk', '+923000000013', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (23, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (23, 6, 'REG-NO-0013');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (23, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (24, 'Ali', 'Raza', 'ali.raza14@namal.edu.pk', '+923000000014', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (24, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (24, 7, 'REG-NO-0014');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (24, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (25, 'Hassan', 'Mahmood', 'hassan.mahmood15@namal.edu.pk', '+923000000015', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (25, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (25, 8, 'REG-NO-0015');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (25, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (26, 'Hussain', 'Shah', 'hussain.shah16@namal.edu.pk', '+923000000016', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (26, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (26, 1, 'REG-NO-0016');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (26, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (27, 'Ibrahim', 'Lodhi', 'ibrahim.lodhi17@namal.edu.pk', '+923000000017', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (27, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (27, 2, 'REG-NO-0017');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (27, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (28, 'Saad', 'Malik', 'saad.malik18@namal.edu.pk', '+923000000018', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (28, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (28, 3, 'REG-NO-0018');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (28, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (29, 'Mustafa', 'Qureshi', 'mustafa.qureshi19@namal.edu.pk', '+923000000019', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (29, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (29, 4, 'REG-NO-0019');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (29, NULL, 2, 5);
INSERT INTO USER (user_id, first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (30, 'Yahya', 'Alvi', 'yahya.alvi20@namal.edu.pk', '+923000000020', '$2a$10$ITbLsFUeYgfW7OvULNzluOLyp5htKguZluugBbDYXr69mM7UkfkDG', CURDATE());
INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (30, 'Active', TRUE, FALSE, 1, NOW());
INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (30, 5, 'REG-NO-0020');
INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (30, NULL, 2, 5);

-- Seed 20 Support Tickets
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (1, 12, 'Login issue on mobile', 'Open', 2, NULL, NOW() - INTERVAL 1 DAY, 'This is query description detail for Login issue on mobile submitted by player ID 12.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (2, 13, 'Simulation screen freezing', 'Resolved', 3, NULL, NOW() - INTERVAL 2 DAY, 'This is query description detail for Simulation screen freezing submitted by player ID 13.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (3, 14, 'Wicket-keeping video not loading', 'Open', 1, NULL, NOW() - INTERVAL 3 DAY, 'This is query description detail for Wicket-keeping video not loading submitted by player ID 14.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (4, 15, 'How to reset my password', 'Resolved', 2, NULL, NOW() - INTERVAL 4 DAY, 'This is query description detail for How to reset my password submitted by player ID 15.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (5, 16, 'Certificate request', 'Open', 3, NULL, NOW() - INTERVAL 5 DAY, 'This is query description detail for Certificate request submitted by player ID 16.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (6, 17, 'Slow load times in dashboard', 'Resolved', 1, NULL, NOW() - INTERVAL 6 DAY, 'This is query description detail for Slow load times in dashboard submitted by player ID 17.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (7, 18, 'Feedback on Cover Drive drill', 'Open', 2, NULL, NOW() - INTERVAL 7 DAY, 'This is query description detail for Feedback on Cover Drive drill submitted by player ID 18.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (8, 19, 'Account suspended question', 'Resolved', 3, NULL, NOW() - INTERVAL 8 DAY, 'This is query description detail for Account suspended question submitted by player ID 19.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (9, 20, 'Institute not listed', 'Open', 1, NULL, NOW() - INTERVAL 9 DAY, 'This is query description detail for Institute not listed submitted by player ID 20.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (10, 21, 'Common mistake text error', 'Resolved', 2, NULL, NOW() - INTERVAL 10 DAY, 'This is query description detail for Common mistake text error submitted by player ID 21.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (11, 22, 'Leaderboard stats wrong', 'Open', 3, NULL, NOW() - INTERVAL 11 DAY, 'This is query description detail for Leaderboard stats wrong submitted by player ID 22.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (12, 23, 'Cannot log simulation completed', 'Resolved', 1, NULL, NOW() - INTERVAL 12 DAY, 'This is query description detail for Cannot log simulation completed submitted by player ID 23.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (13, 24, 'UI display bugs', 'Open', 2, NULL, NOW() - INTERVAL 13 DAY, 'This is query description detail for UI display bugs submitted by player ID 24.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (14, 25, 'Unable to upload profile picture', 'Resolved', 3, NULL, NOW() - INTERVAL 14 DAY, 'This is query description detail for Unable to upload profile picture submitted by player ID 25.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (15, 26, 'Support ticket responses empty', 'Open', 1, NULL, NOW() - INTERVAL 15 DAY, 'This is query description detail for Support ticket responses empty submitted by player ID 26.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (16, 27, 'Notice board event link broken', 'Resolved', 2, NULL, NOW() - INTERVAL 16 DAY, 'This is query description detail for Notice board event link broken submitted by player ID 27.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (17, 28, 'Streak reset incorrect', 'Open', 3, NULL, NOW() - INTERVAL 17 DAY, 'This is query description detail for Streak reset incorrect submitted by player ID 28.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (18, 29, 'Batting category difficulty feedback', 'Resolved', 1, NULL, NOW() - INTERVAL 18 DAY, 'This is query description detail for Batting category difficulty feedback submitted by player ID 29.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (19, 30, 'Inswing video is showing Yorker description', 'Open', 2, NULL, NOW() - INTERVAL 19 DAY, 'This is query description detail for Inswing video is showing Yorker description submitted by player ID 30.');
INSERT INTO TICKETS (ticket_id, player_id, subject, status, Category_id, Attachment_URL, Submission_Date, Description) VALUES (20, 11, 'FAQ content suggestions', 'Resolved', 3, NULL, NOW() - INTERVAL 20 DAY, 'This is query description detail for FAQ content suggestions submitted by player ID 11.');

-- Seed 20 Cricket Quotes
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (1, "Cricket is a pressure game, and when it comes to an India-Pakistan match the pressure is doubled.", 'Mindset', TRUE, 'Imran Khan', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (2, "I don't think there is any yardstick for success. It is a state of mind.", 'Mindset', TRUE, 'MS Dhoni', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (3, "Every batsman is vulnerable to a good delivery.", 'Batting', TRUE, 'Sachin Tendulkar', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (4, "The key to winning is bowling well and fielding well.", 'Bowling', TRUE, 'Wasim Akram', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (5, "Fast bowling is 90% mental.", 'Bowling', TRUE, 'Dale Steyn', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (6, "You don't play for the crowd, you play for the country.", 'Mindset', TRUE, 'MS Dhoni', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (7, "Cricket is not sport, it is an emotion.", 'General', TRUE, 'Neville Cardus', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (8, "A captain is only as good as his team.", 'Mindset', TRUE, 'Ricky Ponting', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (9, "First of all, convince yourself that you are the best.", 'Mindset', TRUE, 'Kapil Dev', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (10, "Compete with yourself, not with others.", 'General', TRUE, 'Babar Azam', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (11, "No cricket game is won without team effort.", 'General', TRUE, 'Kane Williamson', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (12, "Enjoy the game and chase your dreams.", 'General', TRUE, 'Sachin Tendulkar', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (13, "If you play with fear, you play with limitations.", 'Mindset', TRUE, 'AB de Villiers', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (14, "Hard work always pays off in the end.", 'Mindset', TRUE, 'Virat Kohli', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (15, "Spin bowling is an art of deception.", 'Bowling', TRUE, 'Shane Warne', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (16, "Stay focused, stay humble.", 'General', TRUE, 'Hashim Amla', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (17, "The wicket-keeper is the heartbeat of the fielding unit.", 'General', TRUE, 'Adam Gilchrist', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (18, "Play to win, but play with spirit.", 'General', TRUE, 'Rahul Dravid', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (19, "Technique is nothing without courage.", 'Batting', TRUE, 'Sunil Gavaskar', NOW());
INSERT INTO QUOTE (quote_id, quote_text, category, active_flag, Author, Created_at) VALUES (20, "Never give up, keep fighting till the last ball.", 'Mindset', TRUE, 'Steve Waugh', NOW());

-- Seed 20 Notice Board Events
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (1, 'NPL Trials 2026', NOW() + INTERVAL 0 DAY, 'Namal Oval', 'Selection trials for the Namal Premier League. All students registered on Criko are eligible.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (2, 'CA Gear Sponsor Day', NOW() + INTERVAL 1 DAY, 'Sports Store', 'Discounted CA equipment now available at discounted rates for Criko members.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (3, 'Batting Masterclass with Coach Ahmed', NOW() + INTERVAL 2 DAY, 'Namal Oval', 'A special class on cover drive and front foot defence.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (4, 'Bowling Speed Test Competition', NOW() + INTERVAL 3 DAY, 'Namal Nets', 'Test your bowling speed using our radar guns.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (5, 'Mindset Seminar with Imran Khan', NOW() + INTERVAL 4 DAY, 'Auditorium 1', 'Cricket mindset and leadership talk.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (6, 'Off-Spin Flight Tutorial Session', NOW() + INTERVAL 5 DAY, 'Namal Oval Nets', 'Spin bowling flight and deception training.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (7, 'Wicket-keeping Drill Session', NOW() + INTERVAL 6 DAY, 'Gymnasium Ground', 'Keeping stance and reflexes enhancement.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (8, 'Intra-University T20 Match', NOW() + INTERVAL 7 DAY, 'Namal Campus Ground', 'Friendly inter-department match.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (9, 'Namal vs LUMS Derby', NOW() + INTERVAL 8 DAY, 'Namal Oval', 'Namal vs LUMS friendly bilateral series opener.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (10, 'Under-19 Cricket Selection', NOW() + INTERVAL 9 DAY, 'Namal Campus Nets', 'Selection of U19 team for the college tournament.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (11, 'Fast Bowlers Fitness Camp', NOW() + INTERVAL 10 DAY, 'Sports Wing Gym', 'Fitness training camp specifically for pace bowlers.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (12, 'Batting Posture Checking Day', NOW() + INTERVAL 11 DAY, 'Namal Oval', 'Biomechanical check for batting postures.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (13, 'Fielding Drills Competition', NOW() + INTERVAL 12 DAY, 'Namal Campus Ground', 'Direct hit catching and throwing competition.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (14, 'Spin Bowling Turn Analysis', NOW() + INTERVAL 13 DAY, 'Namal Campus Nets', 'Spin analytics using track sensors.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (15, 'Namal Cricket Club AGM', NOW() + INTERVAL 14 DAY, 'Sports Block Hall', 'Annual general meeting of student club.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (16, 'Cricket Quiz Night 2026', NOW() + INTERVAL 15 DAY, 'Student Center', 'Trivia competition with exciting giveaways.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (17, 'Bouncer Handling Clinic', NOW() + INTERVAL 16 DAY, 'Namal Campus Nets', 'Special coaching on dodging and hooking bouncers.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (18, 'New Year Cricket Gala', NOW() + INTERVAL 17 DAY, 'Namal Campus Ground', 'Friendly matches and food stalls.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (19, 'Namal vs NUST Cricket Derby', NOW() + INTERVAL 18 DAY, 'NUST Ground', 'Inter-university derby match.', '#', 1);
INSERT INTO CRICKET_EVENT (event_id, event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (20, 'IPL Scouting Info Session', NOW() + INTERVAL 19 DAY, 'Sports Block Hall', 'Informative talk about path to professional leagues.', '#', 1);

-- Seed 20 FAQs
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (1, 'How do I mark a simulation as mastered?', 'To master a technique, you must view every frame in the Simulation Viewer and click the \'Mark as Mastered\' button.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (2, 'Why is my account status \'Pending\'?', 'All student registrations must be verified by the Admin Department. This usually takes 24-48 business hours.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (3, 'Can non-students register?', 'Yes, select \'Other Player\' during signup and enter your organization details.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (4, 'Can I access simulations offline?', 'No, you need an active internet connection to download simulation assets.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (5, 'How is learning streak calculated?', 'Your streak increases when you log in and master at least one simulation daily.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (6, 'What is the NPL?', 'NPL stands for Namal Premier League, our main annual inter-department tournament.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (7, 'How do I reset my password?', 'Click \'Forgot Password\' on the login screen to generate a reset token.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (8, 'Who is the lead coach?', 'The lead coach is Prof. Ahmed Khan, who handles batting and spin.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (9, 'Where is the sports office?', 'It is located in Namal Knowledge City, Block B, Sports Wing.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (10, 'How do I report a bug?', 'Open a ticket in the Support Desk under the \'Technical\' category.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (11, 'What are the simulation categories?', 'Simulations are classified into \'Batting\' and \'Bowling\' categories.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (12, 'Is there a fast bowling course?', 'Yes, Yorker and Outswing drills are available in advanced simulations.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (13, 'Can I change my institute list?', 'Only system administrators can add or remove registered institutes.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (14, 'Are quotes active by default?', 'Yes, new quotes are automatically active and rotate daily on login.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (15, 'How do I delete my account?', 'Submit a deletion request from your profile page.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (16, 'What is the leaderboard?', 'The leaderboard lists the top professional players and their career statistics.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (17, 'How do I check my activity logs?', 'Admins can view all audit action logs on the main dashboard tab.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (18, 'Is there Wicket-Keeping training?', 'Yes, there is a dedicated simulation for wicket-keeping stances.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (19, 'What format of stats are recorded?', 'ODI format is currently used for professional player profiles.', 1);
INSERT INTO FAQS (faq_id, question, answer, admin_id) VALUES (20, 'Who do I contact for event query?', 'Contact the sports department office directly via phone or official support ticket.', 1);

-- Seed 20 Pro Players
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (1, 'Babar Azam', 'Pakistan', 'Batsman', 'Right_Hand', 'Biography info of Babar Azam', 130);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (1, 1, 'ODI', 130);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (1, 6033, 30, 20);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (2, 'Shaheen Afridi', 'Pakistan', 'Bowler', 'Left_Hand', 'Biography info of Shaheen Afridi', 60);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (2, 2, 'ODI', 60);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (2, 4.4, 120);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (3, 'Virat Kohli', 'India', 'Batsman', 'Right_Hand', 'Biography info of Virat Kohli', 295);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (3, 3, 'ODI', 295);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (3, 13906, 72, 50);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (4, 'Rashid Khan', 'Afghanistan', 'Bowler', 'Right_Hand', 'Leg-spin wizard', 90);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (4, 4, 'ODI', 90);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (4, 6.2, 182);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (5, 'Ben Stokes', 'England', 'All-Rounder', 'Left_Hand', 'Dynamic matchwinner', 105);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (5, 5, 'ODI', 105);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (5, 6196, 36, 13);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (5, 5.8, 195);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (6, 'Mohammad Rizwan', 'Pakistan', 'Wicket-Keeper', 'Right_Hand', 'Consistent opener & keeper', 98);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (6, 6, 'ODI', 98);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (6, 3780, 28, 7);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (7, 'Joe Root', 'England', 'Batsman', 'Right_Hand', 'Technically correct red-ball batsman', 165);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (7, 7, 'ODI', 165);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (7, 11808, 63, 35);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (8, 'Jasprit Bumrah', 'India', 'Bowler', 'Right_Hand', 'Unorthodox speedster', 78);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (8, 8, 'ODI', 78);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (8, 4.5, 167);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (9, 'Mitchell Starc', 'Australia', 'Bowler', 'Left_Hand', 'Lethal inswinging yorker specialist', 120);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (9, 9, 'ODI', 120);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (9, 5.1, 236);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (10, 'Steve Smith', 'Australia', 'Batsman', 'Right_Hand', 'Highly unorthodox run machine', 145);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (10, 10, 'ODI', 145);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (10, 9120, 45, 30);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (11, 'Kane Williamson', 'New Zealand', 'Batsman', 'Right_Hand', 'Calm and collected test classicist', 165);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (11, 11, 'ODI', 165);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (11, 8263, 42, 26);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (12, 'Rohit Sharma', 'India', 'Batsman', 'Right_Hand', 'Hitman known for pull shots', 260);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (12, 12, 'ODI', 260);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (12, 10700, 55, 31);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (13, 'David Warner', 'Australia', 'Batsman', 'Left_Hand', 'Explosive left hand opening batsman', 159);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (13, 13, 'ODI', 159);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (13, 6932, 33, 22);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (14, 'Trent Boult', 'New Zealand', 'Bowler', 'Right_Hand', 'Excellent swing bowler in powerplay', 104);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (14, 14, 'ODI', 104);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (14, 4.93, 195);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (15, 'Ravindra Jadeja', 'India', 'All-Rounder', 'Left_Hand', 'Incredible fielder and reliable bowler', 170);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (15, 15, 'ODI', 170);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (15, 2600, 13, 3);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (15, 4.89, 190);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (16, 'Quinton de Kock', 'South Africa', 'Wicket-Keeper', 'Left_Hand', 'Stylish keeper batsman', 145);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (16, 16, 'ODI', 145);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (16, 6100, 30, 17);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (17, 'Kagiso Rabada', 'South Africa', 'Bowler', 'Right_Hand', 'Fierce pace bowler with high bounce', 92);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (17, 17, 'ODI', 92);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (17, 5.01, 150);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (18, 'Shakib Al Hasan', 'Bangladesh', 'All-Rounder', 'Left_Hand', 'One of the best all-rounders in modern era', 240);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (18, 18, 'ODI', 240);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (18, 7200, 53, 9);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (18, 4.45, 300);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (19, 'Jos Buttler', 'England', 'Wicket-Keeper', 'Right_Hand', 'Fierce white ball hitter and skipper', 160);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (19, 19, 'ODI', 160);
INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (19, 4600, 24, 11);
INSERT INTO Professional_PLAYER (player_id, Name, Nationality, role, style, Biography, Matches_Played) VALUES (20, 'Pat Cummins', 'Australia', 'Bowler', 'Right_Hand', 'World cup winning captain and speedster', 88);
INSERT INTO PLAYER_STATISTICS (stat_id, player_id, format, Matches_Played) VALUES (20, 20, 'ODI', 88);
INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (20, 5.21, 141);

-- Seed 15 Simulations (1 is Simulation 1, 2-15 are cricket related)
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (101, 'Basic Grip and Stance', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (101, 'Video', 'Simulations/1.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (101, 'Text', '{"description":"Basic introductory video for training simulation and bat stance.","frames":[{"id":"f-sim-101-1","description":"Initial Stance","keyPoints":["Grip bat face"]},{"id":"f-sim-101-2","description":"Execution Flow","keyPoints":["Hit ball smoothly"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (101, 101001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (101001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (101, 101002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (101002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (102, 'Cover Drive Drill', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (102, 'Video', 'Simulations/2.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (102, 'Text', '{"description":"Master the cover drive with high elbow and precise footwork.","frames":[{"id":"f-sim-102-1","description":"Toe to ball","keyPoints":["Step towards ball line"]},{"id":"f-sim-102-2","description":"Full swing","keyPoints":["Hold balance post-shot"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (102, 102001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (102001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (102, 102002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (102002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (103, 'Pull Shot Practice', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (103, 'Video', 'Simulations/3.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (103, 'Text', '{"description":"Learn to pull short deliveries safely in the gaps.","frames":[{"id":"f-sim-103-1","description":"Backfoot load","keyPoints":["Shift weight to back foot"]},{"id":"f-sim-103-2","description":"Roll wrists","keyPoints":["Keep ball on the ground"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (103, 103001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (103001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (103, 103002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (103002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (104, 'Spin Batting Technique', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (104, 'Video', 'Simulations/4.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (104, 'Text', '{"description":"Improve batting against off-spin and leg-spin deliveries.","frames":[{"id":"f-sim-104-1","description":"Watch the seam","keyPoints":["Read release from bowler hand"]},{"id":"f-sim-104-2","description":"Soft hands","keyPoints":["Play close to body under eyes"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (104, 104001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (104001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (104, 104002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (104002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (105, 'Fast Yorker Defense', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (105, 'Video', 'Simulations/5.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (105, 'Text', '{"description":"Learn to jam down on late swinging yorkers to avoid LBW.","frames":[{"id":"f-sim-105-1","description":"Watch bowler wrist","keyPoints":["Spot yorker release early"]},{"id":"f-sim-105-2","description":"Bat down fast","keyPoints":["Keep toe clear from impact line"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (105, 105001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (105001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (105, 105002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (105002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (106, 'Leg Glance Training', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (106, 'Video', 'Simulations/6.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (106, 'Text', '{"description":"Deflect straight deliveries on leg stump with wrist flick.","frames":[{"id":"f-sim-106-1","description":"Align head","keyPoints":["Watch ball hit center of bat"]},{"id":"f-sim-106-2","description":"Wrist roll","keyPoints":["Flick bat face at impact"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (106, 106001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (106001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (106, 106002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (106002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (107, 'Sweep Shot Mastery', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (107, 'Video', 'Simulations/7.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (107, 'Text', '{"description":"Perfect execution of sweep and sweep paddle shot.","frames":[{"id":"f-sim-107-1","description":"Get down low","keyPoints":["Drop front knee to ground"]},{"id":"f-sim-107-2","description":"Extend arms","keyPoints":["Sweep in high-to-low arc"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (107, 107001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (107001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (107, 107002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (107002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (108, 'Square Cut Precision', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (108, 'Video', 'Simulations/8.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (108, 'Text', '{"description":"Generate power on wide short balls through square cut.","frames":[{"id":"f-sim-108-1","description":"Create room","keyPoints":["Step back and away from stumps"]},{"id":"f-sim-108-2","description":"Horizontal bat","keyPoints":["Slash hard over high point"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (108, 108001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (108001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (108, 108002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (108002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (109, 'Bouncer Evading Drill', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (109, 'Video', 'Simulations/9.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (109, 'Text', '{"description":"Practice swaying or ducking out of the way of bouncers.","frames":[{"id":"f-sim-109-1","description":"Keep eyes on ball","keyPoints":["Watch bouncer pitch"]},{"id":"f-sim-109-2","description":"Sway back","keyPoints":["Drop head and drop bat hands low"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (109, 109001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (109001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (109, 109002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (109002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (110, 'Straight Drive Focus', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (110, 'Video', 'Simulations/10.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (110, 'Text', '{"description":"Play direct, high-elbow straight drive past the bowler.","frames":[{"id":"f-sim-110-1","description":"High elbow","keyPoints":["Keep lead elbow pointing up"]},{"id":"f-sim-110-2","description":"Present full face","keyPoints":["Hit past the bowler smoothly"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (110, 110001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (110001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (110, 110002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (110002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (111, 'Outswing Delivery Check', 120, 2);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (111, 'Video', 'Simulations/11.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (111, 'Text', '{"description":"Learn to release outswingers with upright seam position.","frames":[{"id":"f-sim-111-1","description":"Seam angled","keyPoints":["Angle seam towards first slip"]},{"id":"f-sim-111-2","description":"Wrist release","keyPoints":["Release from index finger"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (111, 111001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (111001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (111, 111002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (111002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (112, 'Inswing Control Drill', 120, 2);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (112, 'Video', 'Simulations/12.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (112, 'Text', '{"description":"Learn to bowl inswingers targetting stumps.","frames":[{"id":"f-sim-112-1","description":"Seam angled","keyPoints":["Angle seam towards fine leg"]},{"id":"f-sim-112-2","description":"Roll fingers","keyPoints":["Push ball from middle finger"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (112, 112001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (112001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (112, 112002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (112002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (113, 'Off-Spin Flight Drill', 120, 2);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (113, 'Video', 'Simulations/13.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (113, 'Text', '{"description":"Vary flight and drift to deceive batsmen in the air.","frames":[{"id":"f-sim-113-1","description":"Pivoted index","keyPoints":["Rip index finger over seam"]},{"id":"f-sim-113-2","description":"Higher trajectory","keyPoints":["Give the ball air and loop"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (113, 113001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (113001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (113, 113002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (113002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (114, 'Leg-Spin Turn Practice', 120, 2);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (114, 'Video', 'Simulations/14.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (114, 'Text', '{"description":"Spin hard from wrist release to maximize turn off pitch.","frames":[{"id":"f-sim-114-1","description":"Third finger rip","keyPoints":["Release over third finger"]},{"id":"f-sim-114-2","description":"Wrist cock","keyPoints":["Flick wrist dynamically at release"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (114, 114001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (114001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (114, 114002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (114002, 'Wait for the ball to enter your zone before starting swing.');
INSERT INTO CRICKET_SIMULATION (simulation_id, simulation_name, duration, CategoryID) VALUES (115, 'Wicket-Keeping Stance', 120, 1);
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (115, 'Video', 'Simulations/15.mp4');
INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (115, 'Text', '{"description":"Perfect posture and reflexes behind the stumps.","frames":[{"id":"f-sim-115-1","description":"Crouch low","keyPoints":["Stay low on toes with feet apart"]},{"id":"f-sim-115-2","description":"Hands together","keyPoints":["Keep hands soft and follow ball path"]}]}');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (115, 115001, 'Incorrect head position');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (115001, 'Keep your head stable and eyes level focused on ball.');
INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (115, 115002, 'Rushed shot execution');
INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (115002, 'Wait for the ball to enter your zone before starting swing.');