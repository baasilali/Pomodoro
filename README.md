# Pomodoro
study efficiently.

# About
Henri Bergson, philosopher and Nobel prize in literature in 1927, talks about the existence of various aspects of time, assuring that only one of them produces anxiety: its dimensional aspect, which pushes us to measure it and triggers the idea of being late. However, seeing time as a succession of events (I wake up, take a shower, have breakfast, go to work etc.) doesn’t generate stress.

Seeing time in a different way, as a vehicle in order to achieve something and not as something we have to reach for, reduces anxiety and this leads to a better personal effectiveness. Being more conscious of how time goes by (the 25 minutes of each pomodoro seem to go by slower) makes us achieve a greater level of concentration.

# Get Started

The program runs on react frontend and utilizes MongoDB for the `pomodoro-backend`. 

```
mkdir Pomodoro
cd Pomodoro
mkdir pomodoro-backend
cd pomodoro-backend
npm init -y
npm install express cors body-parser mongoose 
```

Create a file called `server.js` and add the code.

Follow this step by creating your `pomodoro-frontend`.

```
cd Pomodoro
npx create-react-app pomodoro-frontend
cd pomodoro-frontend
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

From here, ensure that you have created a `PomodoroApp.js` file in your `pomodoro-frontend/public/src/` folder.

After adding all the code, open two terminal windows, one with the directory `pomodoro-backend` and one with the directory `pomodoro-frontend`.

Use the command `npm start` (on backend first) to run the program.
