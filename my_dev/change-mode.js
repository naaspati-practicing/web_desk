const chalk = require('chalk'),
   colorz = require('json-colorz'),
    Confirm = require('prompt-confirm');

colorz.level.spaces = 2
colorz.level.start = 1

function colored(title, json) {
    console.log(chalk.yellow("\n----------------\n" + title + "\n----------------\n"));
    colorz(json);
}

let args;
const isDefined = value => value !== undefined;

module.exports = function (args0) {
    if (Object.keys(args0).length == 0) {
        console.log("not commands specified: ", args);
        return;
    }

    args = args0;
    colored("args", args);

    const config = createConfig(),
        setting = createSetting();
    
    write(config, setting);
}

function write(first, second) {
    if (first) {
        colored(first.to, first.data);
        new Confirm('save ' + first.to + ": ")
            .ask(ans => {
                if (ans) writeJson(first);
                write(second);
            });
    } else if (second) {
        write(second);
    }
}

function writeJson(config) {
    const writeJson = require('write-json');
    writeJson.sync(config.to, config.data);
    console.info(chalk.green('written: '), config.to);
}

function createConfig() {
    if (!isDefined(args.production) && !isDefined(args.mode)) {
        console.log(chalk.green('no modification to: '), '.current_config.json');
        return;
    }
    const config = require('./current_config.json');

    if (isDefined(args.production))
        config["isProduction"] = args.production || config["isProduction"];

    if (isDefined(args.mode)) {
        const modes = {
            scss: 'scss',
            postcss: 'postcss',
            bootstrap3: 'bootstrap3',
            bootstrap4: 'bootstrap4',
            materialize: 'materialize'
        };
        const mode = modes[args.mode];
        if (!isDefined(mode)) {
            console.error(chalk.red('invalid mode: '), args.mode);
            console.log(chalk.red('no modification to: '), '.current_config.json');
            return;
        }
		delete config.gulp;
		config.mode = mode;
        args[mode] = true;
    }
    return { data: config, to: process.env.TASK_ROOT+'current_config.json' };
}

function createSetting() {
    if (!["bootstrap3", "bootstrap4", "materialize", "postcss", "scss", "learn", "working"].some(s => isDefined(args[s]))) {
        console.log(chalk.green('no modification to: '), '.vscode/settings.json');
        return;
    }

    const check = s => args[s] ? false : true;
    const setting = require('../.vscode/settings.json');
    const f = setting['files.exclude'];

    for (const key in f)
        f[key] = true;

    f['gulp*'] = check('gulp');
    f['my_dev/**/bootstrap3*/**'] = check('bootstrap3');
    f['my_dev/**/bootstrap4*/**'] = check('bootstrap4');
    f['my_dev/**/materialize*/**'] = check('materialize');
    f['my_dev/css/pcss'] = check('postcss');
    f['my_dev/css/scss'] = check('scss');
    f['my_dev/pug/general'] = check('postcss') === false ? false : check('scss') === false ? false : true;
    f['LEARN'] = check('learn');
    f['_working'] = check('working');

    return { data: setting, to: '.vscode/settings.json' };
}