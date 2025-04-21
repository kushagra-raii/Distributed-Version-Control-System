#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { commitCommand } from './commands/commit';

const program = new Command();

program.command('init').action(initCommand);
program.command('add <file>').action(addCommand);
program.command('commit <message>').action(commitCommand);

program.parse(process.argv);
