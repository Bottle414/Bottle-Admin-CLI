import { cliAction } from "./action.js"

export const cliCommander = function (program) {
    program.command('create <project> [other...]')
    .alias('crt')
    .description('生成项目模板')
    .action(cliAction)
}
