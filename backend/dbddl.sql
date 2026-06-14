CREATE DATABASE IF NOT EXISTS namalcriko;
USE namalcriko;


CREATE TABLE `Organization` (
    `ORGID` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(100) NOT NULL,
    `Province` VARCHAR(50),
    `City` VARCHAR(50),
    `Country` VARCHAR(50)
);

-- ── 2. Category ─────────────────────────────────────────────────────────────
CREATE TABLE `Category` (
    `Category_id` INT AUTO_INCREMENT PRIMARY KEY,
    `Parent_Category` INT,
    `Difficulty_Level` INT,
    `Name` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`Parent_Category`) REFERENCES `Category` (`Category_id`) ON DELETE SET NULL
);

-- ── 3. QUOTE ────────────────────────────────────────────────────────────────
CREATE TABLE `QUOTE` (
    `quote_id` INT AUTO_INCREMENT PRIMARY KEY,
    `quote_text` VARCHAR(500) UNIQUE NOT NULL,
    `category` ENUM('Batting', 'Bowling', 'General', 'Mindset') NOT NULL,
    `active_flag` BOOLEAN DEFAULT TRUE,
    `Author` VARCHAR(100) NOT NULL,
    `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── 4. USER ─────────────────────────────────────────────────────────────────
CREATE TABLE `USER` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) UNIQUE NOT NULL,
    `phone_number` VARCHAR(50),
    `password_hash` VARCHAR(255) NOT NULL,
    `Created_at` DATE NOT NULL,
    `Deactivated_at` DATE,
    `is_Deleted` BOOLEAN DEFAULT FALSE
);

-- ── 5. ADMIN ────────────────────────────────────────────────────────────────
CREATE TABLE `ADMIN` (
    `admin_id` INT PRIMARY KEY,
    FOREIGN KEY (`admin_id`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE
);

-- ── 6. PLAYER ───────────────────────────────────────────────────────────────
CREATE TABLE `PLAYER` (
    `player_id` INT PRIMARY KEY,
    `status` ENUM('Pending', 'Active', 'Rejected', 'Suspended') DEFAULT 'Pending',
    `Is_Student` BOOLEAN DEFAULT FALSE,
    `Is_Other` BOOLEAN DEFAULT FALSE,
    `Approved_BY` INT,
    `Approve_Date` DATETIME,
    FOREIGN KEY (`player_id`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`Approved_BY`) REFERENCES `ADMIN` (`admin_id`) ON DELETE SET NULL
);

-- ── 7. STUDENT_PLAYER ───────────────────────────────────────────────────────
CREATE TABLE `STUDENT_PLAYER` (
    `player_id` INT PRIMARY KEY,
    `InstituteId` INT,
    `registration_number` VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (`player_id`) REFERENCES `PLAYER` (`player_id`) ON DELETE CASCADE,
    FOREIGN KEY (`InstituteId`) REFERENCES `Organization` (`ORGID`) ON DELETE SET NULL
);

-- ── 8. OTHER_PLAYER ─────────────────────────────────────────────────────────
CREATE TABLE `OTHER_PLAYER` (
    `player_id` INT PRIMARY KEY,
    `OrgID` INT,
    `designation` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`player_id`) REFERENCES `PLAYER` (`player_id`) ON DELETE CASCADE,
    FOREIGN KEY (`OrgID`) REFERENCES `Organization` (`ORGID`) ON DELETE SET NULL
);

-- ── 9. Learnig_Streak ───────────────────────────────────────────────────────
CREATE TABLE `Learnig_Streak` (
    `LearningStreak_id` INT AUTO_INCREMENT PRIMARY KEY,
    `Player_Id` INT NOT NULL,
    `Last_Login` DATETIME,
    `Current_Streak` INT DEFAULT 0,
    `Max_Streak` INT DEFAULT 0,
    FOREIGN KEY (`Player_Id`) REFERENCES `PLAYER` (`player_id`) ON DELETE CASCADE
);

-- ── 10. Professional_PLAYER ──────────────────────────────────────────────────
CREATE TABLE `Professional_PLAYER` (
    `player_id` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(100) NOT NULL,
    `Nationality` VARCHAR(50) NOT NULL,
    `role` ENUM('Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper') NOT NULL,
    `style` ENUM('Left_Hand', 'Right_Hand', 'Spin', 'Fast') NOT NULL,
    `Created_AT` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Biography` TEXT,
    `Deleted_at` DATETIME,
    `Is_Deleted` BOOLEAN DEFAULT FALSE,
    `Matches_Played` INT DEFAULT 0
);

-- ── 11. PLAYER_STATISTICS ────────────────────────────────────────────────────
CREATE TABLE `PLAYER_STATISTICS` (
    `stat_id` INT AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `format` ENUM('TEST', 'ODI', 'T20', 'PSL', 'IPL', 'Other') NOT NULL,
    `Last_Update` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `Matches_Played` INT DEFAULT 0,
    FOREIGN KEY (`player_id`) REFERENCES `Professional_PLAYER` (`player_id`) ON DELETE CASCADE
);

-- ── 12. Batting_STATISTICS ───────────────────────────────────────────────────
CREATE TABLE `Batting_STATISTICS` (
    `stat_id` INT PRIMARY KEY,
    `runs_scored` INT DEFAULT 0,
    `fifties` INT DEFAULT 0,
    `Centuries` INT DEFAULT 0,
    FOREIGN KEY (`stat_id`) REFERENCES `PLAYER_STATISTICS` (`stat_id`) ON DELETE CASCADE
);

-- ── 13. Bowling_STATISTICS ───────────────────────────────────────────────────
CREATE TABLE `Bowling_STATISTICS` (
    `stat_id` INT PRIMARY KEY,
    `average_Wicket_Taken` FLOAT DEFAULT 0.00,
    `wickets_taken` INT DEFAULT 0,
    FOREIGN KEY (`stat_id`) REFERENCES `PLAYER_STATISTICS` (`stat_id`) ON DELETE CASCADE
);

-- ── 14. QUOTE_IMPRESSION ─────────────────────────────────────────────────────
CREATE TABLE `QUOTE_IMPRESSION` (
    `impression_id` INT AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `quote_id` INT NOT NULL,
    `shown_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`player_id`) REFERENCES `PLAYER` (`player_id`) ON DELETE CASCADE,
    FOREIGN KEY (`quote_id`) REFERENCES `QUOTE` (`quote_id`) ON DELETE CASCADE
);

-- ── 15. CRICKET_EVENT ────────────────────────────────────────────────────────
CREATE TABLE `CRICKET_EVENT` (
    `event_id` INT AUTO_INCREMENT PRIMARY KEY,
    `event_name` VARCHAR(200) NOT NULL,
    `event_date` DATETIME NOT NULL,
    `venue` VARCHAR(200) NOT NULL,
    `archived_flag` BOOLEAN DEFAULT FALSE,
    `Image_Url` VARCHAR(500),
    `Created_By_Admin_id` INT,
    `Description` TEXT NOT NULL,
    `Created_AT` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Regestraion_Link` VARCHAR(500),
    FOREIGN KEY (`Created_By_Admin_id`) REFERENCES `ADMIN` (`admin_id`) ON DELETE SET NULL
);

-- ── 16. Ticket_Category ──────────────────────────────────────────────────────
CREATE TABLE `Ticket_Category` (
    `Cat_id` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(100) NOT NULL,
    `Priority_Level` INT NOT NULL
);

-- ── 17. TICKETS ──────────────────────────────────────────────────────────────
CREATE TABLE `TICKETS` (
    `ticket_id` INT AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `subject` VARCHAR(200) NOT NULL,
    `status` ENUM('Open', 'In_Progress', 'Resolved', 'Closed') DEFAULT 'Open',
    `Category_id` INT NOT NULL,
    `Attachment_URL` VARCHAR(500),
    `Submission_Date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Description` TEXT NOT NULL,
    FOREIGN KEY (`player_id`) REFERENCES `PLAYER` (`player_id`) ON DELETE CASCADE,
    FOREIGN KEY (`Category_id`) REFERENCES `Ticket_Category` (`Cat_id`)
);

-- ── 18. Ticket_RESPONSE ──────────────────────────────────────────────────────
CREATE TABLE `Ticket_RESPONSE` (
    `response_id` INT AUTO_INCREMENT PRIMARY KEY,
    `ticket_id` INT NOT NULL,
    `admin_id` INT NOT NULL,
    `description` TEXT NOT NULL,
    `Attachememnt_Url` VARCHAR(500),
    `Responce_Time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`ticket_id`) REFERENCES `TICKETS` (`ticket_id`) ON DELETE CASCADE,
    FOREIGN KEY (`admin_id`) REFERENCES `ADMIN` (`admin_id`) ON DELETE CASCADE
);

-- ── 19. Ticket_History ───────────────────────────────────────────────────────
CREATE TABLE `Ticket_History` (
    `ticket_h_id` INT AUTO_INCREMENT PRIMARY KEY,
    `ticket_id` INT NOT NULL,
    `Old_Status` ENUM('Open', 'In_Progress', 'Resolved', 'Closed') NOT NULL,
    `New_Status` ENUM('Open', 'In_Progress', 'Resolved', 'Closed') NOT NULL,
    `Chaged_By` INT NOT NULL,
    `Update_Date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`ticket_id`) REFERENCES `TICKETS` (`ticket_id`) ON DELETE CASCADE,
    FOREIGN KEY (`Chaged_By`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE
);

-- ── 20. FAQS ─────────────────────────────────────────────────────────────────
CREATE TABLE `FAQS` (
    `faq_id` INT AUTO_INCREMENT PRIMARY KEY,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `admin_id` INT,
    FOREIGN KEY (`admin_id`) REFERENCES `ADMIN` (`admin_id`) ON DELETE SET NULL
);

-- ── 21. ADMIN_ACTION_LOG ─────────────────────────────────────────────────────
CREATE TABLE `ADMIN_ACTION_LOG` (
    `log_id` INT AUTO_INCREMENT PRIMARY KEY,
    `admin_id` INT NOT NULL,
    `player_id` INT,
    `action_type` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `performed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`admin_id`) REFERENCES `ADMIN` (`admin_id`) ON DELETE CASCADE,
    FOREIGN KEY (`player_id`) REFERENCES `PLAYER` (`player_id`) ON DELETE SET NULL
);

-- ── 22. LOGIN_ATTEMPT_LOG ────────────────────────────────────────────────────
CREATE TABLE `LOGIN_ATTEMPT_LOG` (
    `attempt_id` INT AUTO_INCREMENT PRIMARY KEY,
    `ip_address` VARCHAR(45) NOT NULL,
    `is_successful` BOOLEAN NOT NULL,
    `attempted_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Email_Used` VARCHAR(150) NOT NULL,
    `UserId` INT NOT NULL,
    FOREIGN KEY (`UserId`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE
);

-- ── 23. PASSWORD_RESET_TOKEN ─────────────────────────────────────────────────
CREATE TABLE `PASSWORD_RESET_TOKEN` (
    `token_id` INT AUTO_INCREMENT PRIMARY KEY,
    `User_id` INT NOT NULL,
    `token_hash` VARCHAR(255) NOT NULL,
    `expires_at` DATETIME NOT NULL,
    `is_used` BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (`User_id`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE
);

-- ── 24. CRICKET_SIMULATION ───────────────────────────────────────────────────
CREATE TABLE `CRICKET_SIMULATION` (
    `simulation_id` INT AUTO_INCREMENT PRIMARY KEY,
    `simulation_name` VARCHAR(100) UNIQUE NOT NULL,
    `duration` INT DEFAULT 120,
    `Deleted_at` DATE,
    `is_deleted` BOOLEAN DEFAULT FALSE,
    `CategoryID` INT NOT NULL,
    FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`Category_id`)
);

-- ── 25. Asset ────────────────────────────────────────────────────────────────
CREATE TABLE `Asset` (
    `Asset_id` INT AUTO_INCREMENT PRIMARY KEY,
    `Simulation_id` INT NOT NULL,
    `Asset_Type` ENUM('Video', 'Image', 'Text') NOT NULL,
    `Asset_Url` VARCHAR(500) NOT NULL,
    FOREIGN KEY (`Simulation_id`) REFERENCES `CRICKET_SIMULATION` (`simulation_id`) ON DELETE CASCADE
);

-- ── 26. SPECIFIC_MISTAKE ─────────────────────────────────────────────────────
CREATE TABLE `SPECIFIC_MISTAKE` (
    `simulation_id` INT NOT NULL,
    `mistakeid` INT NOT NULL,
    `mistake_desc` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`simulation_id`, `mistakeid`),
    UNIQUE KEY `idx_mistake_unique` (`mistakeid`), -- Unique key required to allow reference by CORRECTION table
    FOREIGN KEY (`simulation_id`) REFERENCES `CRICKET_SIMULATION` (`simulation_id`) ON DELETE CASCADE
);

-- ── 27. CORRECTION ───────────────────────────────────────────────────────────
CREATE TABLE `CORRECTION` (
    `correction_id` INT AUTO_INCREMENT PRIMARY KEY,
    `mistake_id` INT NOT NULL,
    `correction_desc` TEXT NOT NULL,
    FOREIGN KEY (`mistake_id`) REFERENCES `SPECIFIC_MISTAKE` (`mistakeid`) ON DELETE CASCADE
);

-- ── 28. SIMULATION_LOG ───────────────────────────────────────────────────────
CREATE TABLE `SIMULATION_LOG` (
    `log_id` INT AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `view_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `is_completed` BOOLEAN DEFAULT FALSE,
    `Time_Spend_sec` INT DEFAULT 0,
    `Simulation_id` INT NOT NULL,
    FOREIGN KEY (`player_id`) REFERENCES `PLAYER` (`player_id`) ON DELETE CASCADE,
    FOREIGN KEY (`Simulation_id`) REFERENCES `CRICKET_SIMULATION` (`simulation_id`) ON DELETE CASCADE
);

-- ################# PROCEDURES_START #################

USE namalcriko;

DELIMITER $$


CREATE FUNCTION fn_get_player_status(p_player_id INT)
RETURNS VARCHAR(20)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_status VARCHAR(20);
    SELECT status INTO v_status FROM PLAYER WHERE player_id = p_player_id;
    RETURN IFNULL(v_status, 'NOT_FOUND');
END$$


CREATE FUNCTION fn_is_token_valid(p_token_hash VARCHAR(255))
RETURNS BOOLEAN
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count
    FROM PASSWORD_RESET_TOKEN
    WHERE token_hash = p_token_hash
      AND is_used = FALSE
      AND expires_at > NOW();
    RETURN v_count > 0;
END$$


CREATE FUNCTION fn_player_simulations_completed(p_player_id INT)
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count
    FROM SIMULATION_LOG
    WHERE player_id = p_player_id AND is_completed = TRUE;
    RETURN IFNULL(v_count, 0);
END$$


CREATE FUNCTION fn_open_tickets_count(p_player_id INT)
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count
    FROM TICKETS
    WHERE player_id = p_player_id AND status IN ('Open', 'In_Progress');
    RETURN IFNULL(v_count, 0);
END$$


CREATE PROCEDURE sp_register_user(
    IN p_first_name    VARCHAR(100),
    IN p_last_name     VARCHAR(100),
    IN p_email         VARCHAR(150),
    IN p_phone         VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_user_type     ENUM('Student', 'Other'),
    IN p_org_id        INT,
    IN p_reg_number    VARCHAR(50),
    IN p_designation   VARCHAR(100),
    OUT p_new_user_id  INT,
    OUT p_message      VARCHAR(200)
)
sp_register_user: BEGIN
    DECLARE v_exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_exists FROM USER WHERE email = p_email;
    IF v_exists > 0 THEN
        SET p_new_user_id = NULL;
        SET p_message = 'EMAIL_EXISTS';
        LEAVE sp_register_user;
    END IF;

    INSERT INTO USER (first_name, last_name, email, phone_number, password_hash, Created_at)
    VALUES (p_first_name, p_last_name, p_email, p_phone, p_password_hash, CURDATE());

    SET p_new_user_id = LAST_INSERT_ID();

    INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other)
    VALUES (
        p_new_user_id,
        'Pending',
        IF(p_user_type = 'Student', TRUE, FALSE),
        IF(p_user_type = 'Other', TRUE, FALSE)
    );

    IF p_user_type = 'Student' THEN
        INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number)
        VALUES (p_new_user_id, p_org_id, p_reg_number);
    ELSEIF p_user_type = 'Other' THEN
        INSERT INTO OTHER_PLAYER (player_id, OrgID, designation)
        VALUES (p_new_user_id, p_org_id, p_designation);
    END IF;

    INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak)
    VALUES (p_new_user_id, NULL, 0, 0);

    SET p_message = 'SUCCESS';
END$$


CREATE PROCEDURE sp_login_attempt(
    IN  p_email        VARCHAR(150),
    IN  p_ip           VARCHAR(45),
    IN  p_is_success   BOOLEAN,
    OUT p_user_id      INT,
    OUT p_role         VARCHAR(20),
    OUT p_status       VARCHAR(20),
    OUT p_message      VARCHAR(200)
)
BEGIN
    DECLARE v_user_id   INT;
    DECLARE v_is_del    BOOLEAN;
    DECLARE v_is_admin  INT DEFAULT 0;
    DECLARE v_p_status  VARCHAR(20);

    SELECT user_id, is_Deleted INTO v_user_id, v_is_del
    FROM USER WHERE email = p_email LIMIT 1;

    IF v_user_id IS NULL THEN
        SET p_user_id  = NULL;
        SET p_role     = NULL;
        SET p_status   = NULL;
        SET p_message  = 'USER_NOT_FOUND';
    ELSEIF v_is_del THEN
        SET p_user_id  = NULL;
        SET p_role     = NULL;
        SET p_status   = NULL;
        SET p_message  = 'ACCOUNT_DELETED';
    ELSE
        INSERT INTO LOGIN_ATTEMPT_LOG (ip_address, is_successful, Email_Used, UserId)
        VALUES (p_ip, p_is_success, p_email, v_user_id);

        SELECT COUNT(*) INTO v_is_admin FROM ADMIN WHERE admin_id = v_user_id;

        IF v_is_admin > 0 THEN
            SET p_user_id  = v_user_id;
            SET p_role     = 'Admin';
            SET p_status   = 'Active';
            SET p_message  = 'SUCCESS';
        ELSE
            SELECT status INTO v_p_status FROM PLAYER WHERE player_id = v_user_id;
            SET p_user_id  = v_user_id;
            SET p_role     = 'Player';
            SET p_status   = v_p_status;
            SET p_message  = IF(v_p_status = 'Active', 'SUCCESS', 'INACTIVE');

            IF p_is_success AND v_p_status = 'Active' THEN
                CALL sp_update_streak(v_user_id);
            END IF;
        END IF;
    END IF;
END$$


CREATE PROCEDURE sp_update_streak(IN p_player_id INT)
BEGIN
    DECLARE v_last_login DATETIME;
    DECLARE v_current   INT;
    DECLARE v_max       INT;
    DECLARE v_diff      INT;

    SELECT Last_Login, Current_Streak, Max_Streak
    INTO v_last_login, v_current, v_max
    FROM Learnig_Streak WHERE Player_Id = p_player_id
    LIMIT 1;

    IF v_last_login IS NULL THEN
        SET v_current = 1;
    ELSE
        SET v_diff = DATEDIFF(NOW(), v_last_login);
        IF v_diff = 1 THEN
            SET v_current = v_current + 1;
        ELSEIF v_diff = 0 THEN
            SET v_current = v_current;
        ELSE
            SET v_current = 1;
        END IF;
    END IF;

    SET v_max = GREATEST(v_max, v_current);

    UPDATE Learnig_Streak
    SET Last_Login = NOW(), Current_Streak = v_current, Max_Streak = v_max
    WHERE Player_Id = p_player_id;
END$$


CREATE PROCEDURE sp_approve_player(
    IN p_admin_id  INT,
    IN p_player_id INT,
    IN p_action    ENUM('Approve', 'Reject', 'Suspend', 'Restore')
)
BEGIN
    DECLARE v_new_status VARCHAR(20);

    SET v_new_status = CASE p_action
        WHEN 'Approve'  THEN 'Active'
        WHEN 'Reject'   THEN 'Rejected'
        WHEN 'Suspend'  THEN 'Suspended'
        WHEN 'Restore'  THEN 'Active'
    END;

    UPDATE PLAYER
    SET status       = v_new_status,
        Approved_BY  = IF(p_action = 'Approve', p_admin_id, Approved_BY),
        Approve_Date = IF(p_action = 'Approve', NOW(), Approve_Date)
    WHERE player_id = p_player_id;

    INSERT INTO ADMIN_ACTION_LOG (admin_id, player_id, action_type, description)
    VALUES (p_admin_id, p_player_id, p_action,
        CONCAT('Player status changed to ', v_new_status));
END$$


CREATE PROCEDURE sp_delete_user(
    IN p_admin_id  INT,
    IN p_target_id INT
)
BEGIN
    UPDATE USER SET is_Deleted = TRUE, Deactivated_at = CURDATE()
    WHERE user_id = p_target_id;

    INSERT INTO ADMIN_ACTION_LOG (admin_id, player_id, action_type, description)
    VALUES (p_admin_id, p_target_id, 'Delete', 'User account soft-deleted by admin');
END$$


CREATE PROCEDURE sp_update_profile(
    IN p_user_id      INT,
    IN p_first_name   VARCHAR(100),
    IN p_last_name    VARCHAR(100),
    IN p_phone        VARCHAR(50),
    IN p_password_hash VARCHAR(255)
)
BEGIN
    UPDATE USER
    SET first_name    = IFNULL(p_first_name, first_name),
        last_name     = IFNULL(p_last_name, last_name),
        phone_number  = IFNULL(p_phone, phone_number),
        password_hash = IFNULL(p_password_hash, password_hash)
    WHERE user_id = p_user_id;
END$$


CREATE PROCEDURE sp_request_account_deletion(IN p_player_id INT)
BEGIN
    UPDATE PLAYER SET status = 'Suspended' WHERE player_id = p_player_id;
    UPDATE USER SET Deactivated_at = CURDATE() WHERE user_id = p_player_id;
END$$


CREATE PROCEDURE sp_create_password_reset_token(
    IN  p_user_id    INT,
    IN  p_token_hash VARCHAR(255),
    IN  p_expires_at DATETIME,
    OUT p_token_id   INT
)
BEGIN
    UPDATE PASSWORD_RESET_TOKEN SET is_used = TRUE WHERE User_id = p_user_id AND is_used = FALSE;

    INSERT INTO PASSWORD_RESET_TOKEN (User_id, token_hash, expires_at)
    VALUES (p_user_id, p_token_hash, p_expires_at);

    SET p_token_id = LAST_INSERT_ID();
END$$


CREATE PROCEDURE sp_use_password_reset_token(
    IN  p_token_hash  VARCHAR(255),
    IN  p_new_hash    VARCHAR(255),
    OUT p_message     VARCHAR(100)
)
BEGIN
    DECLARE v_user_id INT;
    DECLARE v_valid   BOOLEAN;

    SET v_valid = fn_is_token_valid(p_token_hash);
    IF NOT v_valid THEN
        SET p_message = 'TOKEN_INVALID_OR_EXPIRED';
    ELSE
        SELECT User_id INTO v_user_id FROM PASSWORD_RESET_TOKEN WHERE token_hash = p_token_hash LIMIT 1;
        UPDATE USER SET password_hash = p_new_hash WHERE user_id = v_user_id;
        UPDATE PASSWORD_RESET_TOKEN SET is_used = TRUE WHERE token_hash = p_token_hash;
        SET p_message = 'SUCCESS';
    END IF;
END$$


CREATE PROCEDURE sp_log_simulation(
    IN p_player_id     INT,
    IN p_simulation_id INT,
    IN p_time_spent    INT,
    IN p_completed     BOOLEAN
)
BEGIN
    DECLARE v_existing INT;

    SELECT COUNT(*) INTO v_existing
    FROM SIMULATION_LOG
    WHERE player_id = p_player_id AND Simulation_id = p_simulation_id AND is_completed = TRUE;

    IF v_existing = 0 THEN
        INSERT INTO SIMULATION_LOG (player_id, Simulation_id, Time_Spend_sec, is_completed)
        VALUES (p_player_id, p_simulation_id, p_time_spent, p_completed);
    ELSEIF NOT p_completed THEN
        INSERT INTO SIMULATION_LOG (player_id, Simulation_id, Time_Spend_sec, is_completed)
        VALUES (p_player_id, p_simulation_id, p_time_spent, FALSE);
    END IF;
END$$


CREATE PROCEDURE sp_submit_ticket(
    IN p_player_id   INT,
    IN p_subject     VARCHAR(200),
    IN p_description TEXT,
    IN p_category_id INT,
    IN p_attach_url  VARCHAR(500),
    OUT p_ticket_id  INT
)
BEGIN
    INSERT INTO TICKETS (player_id, subject, description, Category_id, Attachment_URL, status)
    VALUES (p_player_id, p_subject, p_description, p_category_id, p_attach_url, 'Open');
    SET p_ticket_id = LAST_INSERT_ID();
END$$


CREATE PROCEDURE sp_respond_ticket(
    IN p_admin_id    INT,
    IN p_ticket_id   INT,
    IN p_description TEXT,
    IN p_new_status  ENUM('Open', 'In_Progress', 'Resolved', 'Closed'),
    IN p_attach_url  VARCHAR(500)
)
BEGIN
    INSERT INTO Ticket_RESPONSE (ticket_id, admin_id, description, Attachememnt_Url)
    VALUES (p_ticket_id, p_admin_id, p_description, p_attach_url);

    UPDATE TICKETS SET status = p_new_status WHERE ticket_id = p_ticket_id;

    INSERT INTO ADMIN_ACTION_LOG (admin_id, player_id, action_type, description)
    SELECT p_admin_id, player_id,
           'TicketResponse',
           CONCAT('Ticket #', p_ticket_id, ' set to ', p_new_status)
    FROM TICKETS WHERE ticket_id = p_ticket_id;
END$$


CREATE PROCEDURE sp_manage_faq(
    IN p_faq_id   INT,
    IN p_admin_id INT,
    IN p_question TEXT,
    IN p_answer   TEXT
)
BEGIN
    IF p_faq_id IS NULL THEN
        INSERT INTO FAQS (question, answer, admin_id) VALUES (p_question, p_answer, p_admin_id);
    ELSE
        UPDATE FAQS SET question = p_question, answer = p_answer WHERE faq_id = p_faq_id;
    END IF;
END$$


CREATE PROCEDURE sp_manage_event(
    IN p_admin_id     INT,
    IN p_event_id     INT,
    IN p_event_name   VARCHAR(200),
    IN p_event_date   DATETIME,
    IN p_venue        VARCHAR(200),
    IN p_description  TEXT,
    IN p_image_url    VARCHAR(500),
    IN p_reg_link     VARCHAR(500)
)
BEGIN
    IF p_event_id IS NULL THEN
        INSERT INTO CRICKET_EVENT (event_name, event_date, venue, Description, Image_Url, Regestraion_Link, Created_By_Admin_id)
        VALUES (p_event_name, p_event_date, p_venue, p_description, p_image_url, p_reg_link, p_admin_id);

        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'CreateEvent', CONCAT('Created event: ', p_event_name));
    ELSE
        UPDATE CRICKET_EVENT
        SET event_name = p_event_name, event_date = p_event_date, venue = p_venue,
            Description = p_description, Image_Url = p_image_url, Regestraion_Link = p_reg_link
        WHERE event_id = p_event_id;

        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'UpdateEvent', CONCAT('Updated event ID: ', p_event_id));
    END IF;
END$$


CREATE PROCEDURE sp_archive_event(IN p_admin_id INT, IN p_event_id INT)
BEGIN
    UPDATE CRICKET_EVENT SET archived_flag = TRUE WHERE event_id = p_event_id;

    INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
    VALUES (p_admin_id, 'ArchiveEvent', CONCAT('Archived event ID: ', p_event_id));
END$$


CREATE PROCEDURE sp_manage_simulation(
    IN p_admin_id       INT,
    IN p_sim_id         INT,
    IN p_name           VARCHAR(100),
    IN p_duration       INT,
    IN p_category_id    INT
)
BEGIN
    IF p_sim_id IS NULL THEN
        INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID)
        VALUES (p_name, p_duration, p_category_id);

        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'CreateSimulation', CONCAT('Created simulation: ', p_name));
    ELSE
        UPDATE CRICKET_SIMULATION
        SET simulation_name = p_name, duration = p_duration, CategoryID = p_category_id
        WHERE simulation_id = p_sim_id;

        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'UpdateSimulation', CONCAT('Updated simulation ID: ', p_sim_id));
    END IF;
END$$


CREATE PROCEDURE sp_soft_delete_simulation(IN p_admin_id INT, IN p_sim_id INT)
BEGIN
    UPDATE CRICKET_SIMULATION
    SET is_deleted = TRUE, Deleted_at = CURDATE()
    WHERE simulation_id = p_sim_id;

    INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
    VALUES (p_admin_id, 'DeleteSimulation', CONCAT('Soft-deleted simulation ID: ', p_sim_id));
END$$


CREATE PROCEDURE sp_manage_quote(
    IN p_admin_id   INT,
    IN p_quote_id   INT,
    IN p_text       VARCHAR(500),
    IN p_author     VARCHAR(100),
    IN p_category   ENUM('Batting', 'Bowling', 'General', 'Mindset'),
    IN p_active     BOOLEAN
)
BEGIN
    IF p_quote_id IS NULL THEN
        INSERT INTO QUOTE (quote_text, Author, category, active_flag)
        VALUES (p_text, p_author, p_category, p_active);
        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'CreateQuote', CONCAT('Added quote by ', p_author));
    ELSE
        UPDATE QUOTE
        SET quote_text = p_text, Author = p_author, category = p_category, active_flag = p_active
        WHERE quote_id = p_quote_id;
        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'UpdateQuote', CONCAT('Updated quote ID: ', p_quote_id));
    END IF;
END$$


CREATE PROCEDURE sp_get_daily_quote(IN p_player_id INT, OUT p_quote_id INT)
BEGIN
    DECLARE v_today DATE;
    DECLARE v_existing INT;

    SET v_today = CURDATE();

    SELECT qi.quote_id INTO v_existing
    FROM QUOTE_IMPRESSION qi
    WHERE qi.player_id = p_player_id AND DATE(qi.shown_date) = v_today
    LIMIT 1;

    IF v_existing IS NOT NULL THEN
        SET p_quote_id = v_existing;
    ELSE
        SELECT q.quote_id INTO p_quote_id
        FROM QUOTE q
        WHERE q.active_flag = TRUE
          AND q.quote_id NOT IN (
              SELECT qi2.quote_id FROM QUOTE_IMPRESSION qi2
              WHERE qi2.player_id = p_player_id
                AND qi2.shown_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
          )
        ORDER BY RAND()
        LIMIT 1;

        IF p_quote_id IS NOT NULL THEN
            INSERT INTO QUOTE_IMPRESSION (player_id, quote_id) VALUES (p_player_id, p_quote_id);
        ELSE
            SELECT q.quote_id INTO p_quote_id
            FROM QUOTE q WHERE q.active_flag = TRUE ORDER BY RAND() LIMIT 1;
        END IF;
    END IF;
END$$


CREATE PROCEDURE sp_manage_pro_player(
    IN p_admin_id    INT,
    IN p_player_id   INT,
    IN p_name        VARCHAR(100),
    IN p_nationality VARCHAR(50),
    IN p_role        ENUM('Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'),
    IN p_style       ENUM('Left_Hand', 'Right_Hand', 'Spin', 'Fast'),
    IN p_biography   TEXT
)
BEGIN
    IF p_player_id IS NULL THEN
        INSERT INTO Professional_PLAYER (Name, Nationality, role, style, Biography)
        VALUES (p_name, p_nationality, p_role, p_style, p_biography);
        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'CreateProPlayer', CONCAT('Added pro player: ', p_name));
    ELSE
        UPDATE Professional_PLAYER
        SET Name = p_name, Nationality = p_nationality, role = p_role,
            style = p_style, Biography = p_biography
        WHERE player_id = p_player_id;
        INSERT INTO ADMIN_ACTION_LOG (admin_id, action_type, description)
        VALUES (p_admin_id, 'UpdateProPlayer', CONCAT('Updated pro player ID: ', p_player_id));
    END IF;
END$$


CREATE TRIGGER trg_ticket_status_history
AFTER UPDATE ON TICKETS
FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status THEN
        INSERT INTO Ticket_History (ticket_id, Old_Status, New_Status, Chaged_By)
        SELECT NEW.ticket_id, OLD.status, NEW.status, admin_id
        FROM Ticket_RESPONSE
        WHERE ticket_id = NEW.ticket_id
        ORDER BY response_id DESC
        LIMIT 1;
    END IF;
END$$


CREATE TRIGGER trg_admin_action_on_user_delete
BEFORE UPDATE ON USER
FOR EACH ROW
BEGIN
    IF OLD.is_Deleted = FALSE AND NEW.is_Deleted = TRUE THEN
        INSERT INTO ADMIN_ACTION_LOG (admin_id, player_id, action_type, description)
        SELECT a.admin_id, OLD.user_id, 'SoftDelete',
               CONCAT('Account for ', OLD.email, ' marked deleted')
        FROM ADMIN a
        ORDER BY a.admin_id LIMIT 1;
    END IF;
END$$


CREATE TRIGGER trg_player_status_log
AFTER UPDATE ON PLAYER
FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status AND NEW.Approved_BY IS NOT NULL THEN
        INSERT INTO ADMIN_ACTION_LOG (admin_id, player_id, action_type, description)
        VALUES (NEW.Approved_BY, NEW.player_id, NEW.status,
                CONCAT('Status changed: ', OLD.status, ' → ', NEW.status));
    END IF;
END$$


CREATE VIEW vw_pending_players AS
SELECT
    u.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    u.email,
    u.phone_number,
    u.Created_at,
    p.status,
    p.Is_Student,
    p.Is_Other,
    sp.registration_number,
    o1.Name AS institute_name,
    op.designation,
    o2.Name AS org_name
FROM PLAYER p
JOIN USER u ON u.user_id = p.player_id
LEFT JOIN STUDENT_PLAYER sp ON sp.player_id = p.player_id
LEFT JOIN Organization o1 ON o1.ORGID = sp.InstituteId
LEFT JOIN OTHER_PLAYER op ON op.player_id = p.player_id
LEFT JOIN Organization o2 ON o2.ORGID = op.OrgID
WHERE p.status = 'Pending' AND u.is_Deleted = FALSE$$


CREATE VIEW vw_all_players AS
SELECT
    u.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    u.email,
    u.phone_number,
    u.Created_at,
    p.status,
    p.Is_Student,
    p.Is_Other,
    p.Approve_Date,
    CONCAT(au.first_name, ' ', au.last_name) AS approved_by_name,
    sp.registration_number,
    o1.Name AS institute_name,
    op.designation,
    o2.Name AS org_name,
    ls.Current_Streak,
    ls.Max_Streak,
    ls.Last_Login
FROM PLAYER p
JOIN USER u ON u.user_id = p.player_id
LEFT JOIN ADMIN a ON a.admin_id = p.Approved_BY
LEFT JOIN USER au ON au.user_id = a.admin_id
LEFT JOIN STUDENT_PLAYER sp ON sp.player_id = p.player_id
LEFT JOIN Organization o1 ON o1.ORGID = sp.InstituteId
LEFT JOIN OTHER_PLAYER op ON op.player_id = p.player_id
LEFT JOIN Organization o2 ON o2.ORGID = op.OrgID
LEFT JOIN Learnig_Streak ls ON ls.Player_Id = p.player_id
WHERE u.is_Deleted = FALSE$$


CREATE VIEW vw_player_dashboard AS
SELECT
    u.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    u.email,
    p.status,
    ls.Current_Streak,
    ls.Max_Streak,
    ls.Last_Login,
    COUNT(DISTINCT sl.log_id) AS total_sessions,
    SUM(CASE WHEN sl.is_completed THEN 1 ELSE 0 END) AS completed_simulations,
    SUM(sl.Time_Spend_sec) AS total_time_sec,
    COUNT(DISTINCT CASE WHEN t.status IN ('Open','In_Progress') THEN t.ticket_id END) AS open_tickets
FROM USER u
JOIN PLAYER p ON p.player_id = u.user_id
LEFT JOIN Learnig_Streak ls ON ls.Player_Id = u.user_id
LEFT JOIN SIMULATION_LOG sl ON sl.player_id = u.user_id
LEFT JOIN TICKETS t ON t.player_id = u.user_id
WHERE u.is_Deleted = FALSE
GROUP BY u.user_id, u.first_name, u.last_name, u.email, p.status,
         ls.Current_Streak, ls.Max_Streak, ls.Last_Login$$


CREATE VIEW vw_admin_action_log AS
SELECT
    aal.log_id,
    aal.performed_at,
    aal.action_type,
    aal.description,
    CONCAT(au.first_name, ' ', au.last_name) AS admin_name,
    au.email AS admin_email,
    aal.player_id,
    CONCAT(pu.first_name, ' ', pu.last_name) AS player_name
FROM ADMIN_ACTION_LOG aal
JOIN USER au ON au.user_id = aal.admin_id
LEFT JOIN USER pu ON pu.user_id = aal.player_id
ORDER BY aal.performed_at DESC$$


CREATE VIEW vw_open_tickets AS
SELECT
    t.ticket_id,
    t.subject,
    t.description,
    t.status,
    t.Submission_Date,
    t.Attachment_URL,
    tc.Name AS category_name,
    tc.Priority_Level,
    CONCAT(u.first_name, ' ', u.last_name) AS player_name,
    u.email AS player_email
FROM TICKETS t
JOIN PLAYER p ON p.player_id = t.player_id
JOIN USER u ON u.user_id = p.player_id
JOIN Ticket_Category tc ON tc.Cat_id = t.Category_id
WHERE t.status IN ('Open', 'In_Progress')
ORDER BY tc.Priority_Level DESC, t.Submission_Date ASC$$


CREATE VIEW vw_simulation_catalog AS
SELECT
    cs.simulation_id,
    cs.simulation_name,
    cs.duration,
    c.Name AS category_name,
    c.Difficulty_Level,
    pc.Name AS parent_category_name,
    COUNT(DISTINCT a.Asset_id) AS asset_count,
    COUNT(DISTINCT sm.mistakeid) AS mistake_count
FROM CRICKET_SIMULATION cs
JOIN Category c ON c.Category_id = cs.CategoryID
LEFT JOIN Category pc ON pc.Category_id = c.Parent_Category
LEFT JOIN Asset a ON a.Simulation_id = cs.simulation_id
LEFT JOIN SPECIFIC_MISTAKE sm ON sm.simulation_id = cs.simulation_id
WHERE cs.is_deleted = FALSE
GROUP BY cs.simulation_id, cs.simulation_name, cs.duration,
         c.Name, c.Difficulty_Level, pc.Name$$


CREATE VIEW vw_simulation_logs AS
SELECT
    sl.log_id,
    sl.view_time,
    sl.is_completed,
    sl.Time_Spend_sec,
    CONCAT(u.first_name, ' ', u.last_name) AS player_name,
    u.email,
    cs.simulation_name,
    c.Name AS category
FROM SIMULATION_LOG sl
JOIN PLAYER p ON p.player_id = sl.player_id
JOIN USER u ON u.user_id = p.player_id
JOIN CRICKET_SIMULATION cs ON cs.simulation_id = sl.Simulation_id
JOIN Category c ON c.Category_id = cs.CategoryID
ORDER BY sl.view_time DESC$$


CREATE VIEW vw_admin_overview AS
SELECT
    (SELECT COUNT(*) FROM USER WHERE is_Deleted = FALSE) AS total_users,
    (SELECT COUNT(*) FROM PLAYER WHERE status = 'Active') AS active_players,
    (SELECT COUNT(*) FROM PLAYER WHERE status = 'Pending') AS pending_approvals,
    (SELECT COUNT(*) FROM PLAYER WHERE status = 'Suspended') AS suspended_players,
    (SELECT COUNT(*) FROM CRICKET_SIMULATION WHERE is_deleted = FALSE) AS total_simulations,
    (SELECT COUNT(*) FROM TICKETS WHERE status IN ('Open','In_Progress')) AS open_tickets,
    (SELECT COUNT(*) FROM CRICKET_EVENT WHERE archived_flag = FALSE) AS active_events,
    (SELECT COUNT(*) FROM ADMIN_ACTION_LOG WHERE DATE(performed_at) = CURDATE()) AS admin_actions_today$$


CREATE VIEW vw_pro_players AS
SELECT
    pp.player_id,
    pp.Name,
    pp.Nationality,
    pp.role,
    pp.style,
    pp.Biography,
    pp.Matches_Played,
    pp.Created_AT,
    bs_batting.runs_scored,
    bs_batting.fifties,
    bs_batting.Centuries,
    bw_bowling.wickets_taken,
    bw_bowling.average_Wicket_Taken
FROM Professional_PLAYER pp
LEFT JOIN PLAYER_STATISTICS ps_b ON ps_b.player_id = pp.player_id AND ps_b.format = 'ODI'
LEFT JOIN Batting_STATISTICS bs_batting ON bs_batting.stat_id = ps_b.stat_id
LEFT JOIN PLAYER_STATISTICS ps_w ON ps_w.player_id = pp.player_id AND ps_w.format = 'ODI'
LEFT JOIN Bowling_STATISTICS bw_bowling ON bw_bowling.stat_id = ps_w.stat_id
WHERE pp.Is_Deleted = FALSE$$

CREATE PROCEDURE sp_create_organization(
    IN p_name VARCHAR(100),
    IN p_province VARCHAR(50),
    IN p_city VARCHAR(50),
    IN p_country VARCHAR(50),
    OUT p_org_id INT
)
BEGIN
    INSERT INTO Organization (Name, Province, City, Country)
    VALUES (p_name, p_province, p_city, p_country);
    SET p_org_id = LAST_INSERT_ID();
END$$

CREATE PROCEDURE sp_update_organization(
    IN p_org_id INT,
    IN p_name VARCHAR(100)
)
BEGIN
    UPDATE Organization SET Name = p_name WHERE ORGID = p_org_id;
END$$

CREATE PROCEDURE sp_delete_organization(
    IN p_org_id INT
)
BEGIN
    DELETE FROM Organization WHERE ORGID = p_org_id;
END$$

CREATE PROCEDURE sp_delete_quote(
    IN p_quote_id INT
)
BEGIN
    DELETE FROM QUOTE WHERE quote_id = p_quote_id;
END$$

CREATE PROCEDURE sp_delete_pro_player(
    IN p_player_id INT
)
BEGIN
    UPDATE Professional_PLAYER SET Is_Deleted = TRUE, Deleted_at = NOW() WHERE player_id = p_player_id;
END$$

DELIMITER ;