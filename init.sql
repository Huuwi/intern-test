USE intern_test;

CREATE TABLE IF NOT EXISTS Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    nickName NVARCHAR (30),
    isAdmin BOOLEAN DEFAULT 0,
    email VARCHAR(255),
    phone VARCHAR(10),
    avatar VARCHAR(100),
    status ENUM('single', 'married') NOT NULL DEFAULT 'single',
    isDelete BOOLEAN DEFAULT 0
);

-- Chèn dữ liệu mẫu
INSERT INTO
    Users (
        username,
        password,
        nickName,
        isAdmin,
        email,
        phone,
        avatar,
        status,
        isDelete
    )
VALUES (
        'admin',
        '21232f297a57a5a743894a0e4a801fc3',
        'admin',
        1,
        'admin@gmail.com',
        '0126593265',
        'https://th.bing.com/th/id/OIP.D4u1yGsKjIv918Mupc01-wHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain',
        'married',
        0
    );

INSERT INTO
    Users (
        username,
        password,
        nickName,
        isAdmin,
        email,
        phone,
        avatar,
        status
    )
VALUES (
        'user1',
        '24c9e15e52afc47c225b757e7bee1f9d',
        'user1',
        0,
        'user1@gmail.com',
        '0755656854',
        'https://th.bing.com/th/id/R.b18dd752becf618b06ccc013eca5eea9?rik=gWbRWqzqLH%2bZwQ&pid=ImgRaw&r=0',
        'single'
    );