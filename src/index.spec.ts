import { mail } from './index';

const newline = `send current-issue

send index`;

describe('mail', () => {
	it('handles no input', () => {
		expect(mail.build()).toEqual('mailto:');
	});

	it('adds no to addresses', () => {
		const mailto = mail.to().build();

		expect(mailto).toEqual('mailto:');
	});

	it('adds no cc addresses', () => {
		const mailto = mail.cc().build();

		expect(mailto).toEqual('mailto:');
	});

	it('adds no bcc addresses', () => {
		const mailto = mail.bcc().build();

		expect(mailto).toEqual('mailto:');
	});

	it('clears out body when passed undefined', () => {
		const mailto = mail.body('test');
		const updated = mailto.body(undefined);

		expect(mailto.build()).toEqual('mailto:?body=test');
		expect(updated.build()).toEqual('mailto:');
	});

	it('clears out subject when passed undefined', () => {
		const mailto = mail.subject('test');
		const updated = mailto.subject(undefined);

		expect(mailto.build()).toEqual('mailto:?subject=test');
		expect(updated.build()).toEqual('mailto:');
	});

	it('adds single address', () => {
		const mailto = mail.to('mickey@disney.com').build();

		expect(mailto).toEqual('mailto:mickey@disney.com');
	});

	it('adds subject header', () => {
		const mailto = mail.subject('XYZ').build();

		expect(mailto).toEqual('mailto:?subject=XYZ');
	});

	it('adds encoded subject', () => {
		const mailto = mail.subject('Hello world!').build();

		expect(mailto).toEqual('mailto:?subject=Hello%20world!');
	});

	it('adds body header', () => {
		const mailto = mail.body('ABC').build();

		expect(mailto).toEqual('mailto:?body=ABC');
	});

	it('adds encoded body header', () => {
		const mailto = mail.body("What's Up?").build();

		expect(mailto).toEqual("mailto:?body=What's%20Up%3F");
	});

	it('adds single cc header', () => {
		const mailto = mail.cc("pluto@disney.com").build();

		expect(mailto).toEqual("mailto:?cc=pluto@disney.com");
	});

	it('adds single bcc header', () => {
		const mailto = mail.bcc("donald.duck@disney.com").build();

		expect(mailto).toEqual("mailto:?bcc=donald.duck@disney.com");
	});

	it('adds multiple to addresses', () => {
		const mailto = mail
			.to('mickey@disney.com', 'goofy@disney.com')
			.build();

		expect(mailto).toEqual('mailto:mickey@disney.com,goofy@disney.com');
	});

	it('adds multiple to addresses after multiple calls', () => {
		const mailto = mail
			.to('mickey@disney.com')
			.to('goofy@disney.com')
			.build();

		expect(mailto).toEqual('mailto:mickey@disney.com,goofy@disney.com');
	});

	it('adds multiple cc addresses', () => {
		const mailto = mail
			.cc('pluto@disney.com', 'walt@disney.com')
			.build();

		expect(mailto).toEqual("mailto:?cc=pluto@disney.com,walt@disney.com");
	});

	it('adds multiple cc addresses after multiple calls', () => {
		const mailto = mail
			.cc('pluto@disney.com')
			.cc('walt@disney.com')
			.build();

		expect(mailto).toEqual("mailto:?cc=pluto@disney.com,walt@disney.com");
	});

	it('adds multiple bcc addresses', () => {
		const mailto = mail
			.bcc('donald.duck@disney.com', 'daisy.duck@disney.com')
			.build();

		expect(mailto).toEqual("mailto:?bcc=donald.duck@disney.com,daisy.duck@disney.com");
	});

	it('adds multiple bcc addresses after multiple calls', () => {
		const mailto = mail
			.bcc('donald.duck@disney.com')
			.bcc('daisy.duck@disney.com')
			.build();

		expect(mailto).toEqual("mailto:?bcc=donald.duck@disney.com,daisy.duck@disney.com");
	});

	it('handles different orders', () => {
		const first = mail.to('example.com').subject('hello world!').body('test').cc('yo@test.com').build();
		const second = mail.subject('hello world!').body('test').cc('yo@test.com').to('example.com').build();

		expect(first).toEqual(second);
	});

	it('handles builder pattern', () => {
		const getCustomBody = (customer: { name: string }) => `I would like to increase my credit limit. -${customer.name}`;

		const mailto = mail.to('support@company.com', 'billing@company.com')
			.cc('qa@company.com')
			.subject('Limit increase');

		expect(mailto.body(getCustomBody({ name: 'John' })).build())
			.toEqual('mailto:support@company.com,billing@company.com?subject=Limit%20increase&body=I%20would%20like%20to%20increase%20my%20credit%20limit.%20-John&cc=qa@company.com');
		
		expect(mailto.body(getCustomBody({ name: 'James' })).build())
			.toEqual('mailto:support@company.com,billing@company.com?subject=Limit%20increase&body=I%20would%20like%20to%20increase%20my%20credit%20limit.%20-James&cc=qa@company.com');

		expect(mailto.body(getCustomBody({ name: 'Jimmy' })).build())
			.toEqual('mailto:support@company.com,billing@company.com?subject=Limit%20increase&body=I%20would%20like%20to%20increase%20my%20credit%20limit.%20-Jimmy&cc=qa@company.com');
	});

	[
		{
			mailto: mail.to('chris@example.com'),
			expected: 'mailto:chris@example.com'
		},
		{
			mailto: mail.to('infobot@example.com').subject('current-issue'),
			expected: 'mailto:infobot@example.com?subject=current-issue'
		},
		{
			mailto: mail.to('infobot@example.com').subject('send current-issue'),
			expected: 'mailto:infobot@example.com?subject=send%20current-issue'
		},
		{
			mailto: mail
				.to('infobot@example.com')
				.body(newline),
			expected: 'mailto:infobot@example.com?body=send%20current-issue%0A%0Asend%20index'
		},
		{
			mailto: mail
				.to('majordomo@example.com')
				.body('subscribe bamboo-l'),
			expected: 'mailto:majordomo@example.com?body=subscribe%20bamboo-l'
		},
		{
			mailto: mail
				.to('joe@example.com')
				.cc('bob@example.com')
				.body('hello'),
			expected: 'mailto:joe@example.com?body=hello&cc=bob@example.com'
		},
		{
			mailto: mail.to('gorby%kremvax@example.com'),
			expected: 'mailto:gorby%25kremvax@example.com' 
		},
		{
			mailto: mail.to('unlikely?address@example.com'),
			expected: 'mailto:unlikely%3Faddress@example.com'
		},
		{
			mailto: mail.to('joe@xyz.com&cc=bob@xyz.com&body=hello'),
			expected: 'mailto:joe@xyz.com&amp;cc=bob@xyz.com&amp;body=hello'
		}
	].forEach(({ mailto, expected }) => {
		it(`handles RFC 2368 example ${expected}`, () => {
			expect(mailto.build()).toEqual(expected);
		});
	});
});
