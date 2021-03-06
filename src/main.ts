import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
	addEnvVars();
	const app = await NestFactory.create(ApplicationModule);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT || 3000);
	addDx();
}
bootstrap();

function addDx() {
	// @desc a function to add some better developer experience
	if (process.env.ENVIRONMENT === 'dev') {
		openPlayground();
	}
	// @def chalk & log instantiation for logging and opening the server url
	const chalk = require('chalk');
	const log = console.log;
	log(chalk.cyan('\nStarting the development server...\n'));
	log(
		chalk.green(
			`Serving on ${`http://localhost:${process.env.PORT || 3000}`}/graphql`,
		),
	);
}

function addEnvVars() {
	// @def dotenv instantiation for loading .env variables
	require('dotenv').config();
}

function openPlayground() {
	// @def opn instantiation for opening the browser for better dX
	const opn = require('opn');
	// ! opens the browser straight to playground
	opn(`http://localhost:${process.env.PORT || 3000}/graphql`);
}
