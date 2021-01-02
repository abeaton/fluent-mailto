import { Mailto, MailtoBuilder } from "./Mailto";

/**
 * `mail` provides a fluent way to define `mailto` links in javascript.
 * 
 * EXAMPLES
 * ```
 * mail.to('support@test.com').subject('I have a question').build();
 * mail.body('To whom it may concern...').to('qa@test.com', 'support@test.com').build();
 * ```
 * 
 * 1. Order does not matter
 * 2. `addresses` added via `to` are additive. New recipients do not replace the old.
 * 3. `addresses` added via `cc` are additive. New cc'd addresses do not replace the old.
 * 4. `addresses` added via `bcc` are additive. New bcc'd addresses do not replace the old.
 * 5. `body` and `subject` do replace the existing value when set multiple times.
 */
export const mail = {
	to: (...addresses: Array<string>) => new Mailto(new MailtoBuilder({ addresses })),
	subject: (subject: string | undefined) => new Mailto(new MailtoBuilder({ subject })),
	body: (body: string | undefined) => new Mailto(new MailtoBuilder({ body })),
	cc: (...cc: Array<string>) => new Mailto(new MailtoBuilder({ cc })),
	bcc: (...bcc: Array<string>) => new Mailto(new MailtoBuilder({ bcc })),
	build: () => new Mailto().build(),
};