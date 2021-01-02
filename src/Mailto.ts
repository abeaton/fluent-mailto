import { List } from 'immutable';
import { mailtoEncodeURI } from './mailtoEncode';

interface MailtoBuilderInput {
	addresses?: Array<string> | List<string>;
	subject?: string;
	body?: string;
	cc?: Array<string> | List<string>;
	bcc?: Array<string> | List<string>;
}

/**
 * An immutable class that supports `Mailto`. It does the heavy lifting
 * of enabling immutability and building the `mailto` link.
 * 
 * Example:
 * ```
 * new MailtoBuilder().to('example@test.com').subject('Hello world!').build()
 * ```
 * 
 * Notes:
 * 
 * 1) This class attempts to conform to [RFC2368](https://tools.ietf.org/html/rfc2368), but is not guaranteed
 * 2) This component does call encodeURIComponents for subject and body
 * 3) This component does call encodeURI for to, cc, and bcc, plus some logic based on RFC2368
 */
export class MailtoBuilder {
	private _addresses: List<string>;
	private _subject?: string;
	private _body?: string;
	private _cc: List<string>;
	private _bcc: List<string>;

	constructor(input: MailtoBuilderInput = {}) {
		this._addresses = List(input?.addresses);
		this._subject = input?.subject;
		this._body = input?.body;
		this._cc = List(input?.cc);
		this._bcc = List(input?.bcc);
	}

	public to(...addresses: Array<string>): MailtoBuilder {
		return new MailtoBuilder({
			addresses: this._addresses.push(...addresses),
			subject: this._subject,
			body: this._body,
			cc: this._cc,
			bcc: this._bcc,
		});
	}

	public subject(subject: string | undefined): MailtoBuilder {
		return new MailtoBuilder({
			addresses: this._addresses,
			subject: subject,
			body: this._body,
			cc: this._cc,
			bcc: this._bcc,
		});
	}

	public body(body: string | undefined): MailtoBuilder {
		return new MailtoBuilder({
			addresses: this._addresses,
			subject: this._subject,
			body: body,
			cc: this._cc,
			bcc: this._bcc,
		});
	}

	public cc(...newCC: Array<string>): MailtoBuilder {
		return new MailtoBuilder({
			addresses: this._addresses,
			subject: this._subject,
			body: this._body,
			cc: this._cc.push(...newCC),
			bcc: this._bcc,
		});
	}

	public bcc(...newBCC: Array<string>): MailtoBuilder {
		return new MailtoBuilder({
			addresses: this._addresses,
			subject: this._subject,
			body: this._body,
			cc: this._cc,
			bcc: this._bcc.push(...newBCC),
		});
	}

	public build(): string {
		const addresses = this._addresses.map(mailtoEncodeURI).join(',');

		const subject = this._subject ? `subject=${encodeURIComponent(this._subject)}` : undefined;
		const body = this._body ? `body=${encodeURIComponent(this._body)}` : undefined;
		const cc = !this._cc.isEmpty() ? `cc=${this._cc.map(mailtoEncodeURI).join(',')}` : undefined;
		const bcc = !this._bcc.isEmpty() ? `bcc=${this._bcc.map(mailtoEncodeURI).join(',')}` : undefined;

		const headers = [
			subject,
			body,
			cc,
			bcc
		].filter(header => !!header)
		.join('&');

		return headers.length === 0
			? `mailto:${addresses}`
			: `mailto:${addresses}?${headers}`;
	}

	public getAddresses(): Array<string> {
		return this._addresses.toArray();
	}

	public getSubject(): string {
		return this._subject;
	}

	public getBody(): string {
		return this._body;
	}

	public getCC(): Array<string> {
		return this._cc.toArray();
	}

	public getBCC(): Array<string> {
		return this._bcc.toArray();
	}
}

/**
 * An immutable class enabling creation of `mailto` links in javascript.
 * 
 * Example:
 * ```
 * Mailto.to('example@test.com').subject('Hello world!').build()
 * ```
 * 
 * Notes:
 * 
 * 1) This class wraps MailtoBuilder in order to hide getters used for testing.
 * 2) MailtoBuilder attempts to conform to [RFC2368](https://tools.ietf.org/html/rfc2368), but is not guaranteed
 * 3) MailtoBuilder component does call encodeURIComponents for subject and body
 * 4) MailtoBuilder component does call encodeURI for to, cc, and bcc, plus some logic based on RFC2368
 */
export class Mailto {
	private builder: MailtoBuilder;

	constructor(builder: MailtoBuilder = new MailtoBuilder()) { 
		this.builder = builder;
	}

	public to(...addresses: Array<string>): Mailto {
		return new Mailto(this.builder.to(...addresses));
	}

	public subject(subject: string | undefined): Mailto {
		return new Mailto(this.builder.subject(subject));
	}

	public body(body: string | undefined): Mailto {
		return new Mailto(this.builder.body(body));
	}

	public cc(...newCC: Array<string>): Mailto {
		return new Mailto(this.builder.cc(...newCC));
	}

	public bcc(...newBCC: Array<string>): Mailto {
		return new Mailto(this.builder.bcc(...newBCC));
	}

	public build(): string {
		return this.builder.build();
	}	
}