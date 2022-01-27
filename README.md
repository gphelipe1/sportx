# SportX

## Training Repository  | Backend - c#, .NET Core 2.2 | Frontend - ReactJS
 This repository contains usefull react components, such as a responsive and customizable table (using pagination), login card, authentication system (...)
 and its also a nice start for C# / .NET applications.
## [Access]
 The program creates a default user to have access to it. You can just use "admin"/"admin" to login.
## [Backend]
- To run the backend of the aplication, simply run the commands
```sh
dotnet build
dotnet run
```
The backend was built using .NET Core version 2.2

## [Frontend]
- While running the backend, you can now consume all the API data through the frontend of the application (using React, version 17.0.2)
just by running 
```sh
npm install
npm start
```
## [Database]

The database uses SQLServer and to have access to it, just add the properly string connection on the **Backend**'s appsettings file.
Default Connection String:
> Data Source=localhost;Initial Catalog=Sportsx;User ID=your_user;Password=your_password"
