# fluent-mailto
A fluent library for creating mailto links in javascript.

# Testing
* `npm test`

# Build

* `npm run build`

# Problem statement

I couldn't find any libraries that made it simple to define mailto links in javascript code.

For example, when asked to add a mailto link with prepolated data in a react component, no one wants to reinvent the wheel:

1. conditionally combining receipients, body, subject, cc, and bcc with `?`
1. encoding the headers to handle whitespaces, newlines, etc. (i.e. `encodeURI` and `encodeURIComponent`)

Furthermore, it can be frustrating either:

1. Not being able to define a mailto link concisely
1. Defining a new helper function to abstract this formatting code

# Example Usage

fluent-mailto makes it easier to define mailto links in javascript:

## Basic

```
import { mail } from 'fluent-mailto';

...

render() {
	const { recipient, subject, body } = this.props;

	const mailto = mail.to(recipient)
		.subject(subject)
		.body(body)
		.build();

    return (
	    <a href={mailto}>Click here</a>
    );
}

```

## Order agnostic

```
import { mail } from 'fluent-mailto';

describe('mail', () => {
	it('order does not matter', () => {
		const first = mail.to('example.com').subject('hello world!').build();
		const second = mail.subject('hello world!').to('example.com').build();

		expect(first).toEqual(second);
	});
});

```

## Immutable Builder

```
import { mail } from 'fluent-mailto';

...

constructor() {
  this.mailtoBase = mail.to('billing@test.com').cc('support@test.com');
}

render() {
  const { customers } = this.props;

  return customers
    .map(this.getCustomBody)
    .map((body) => this.mailBase.body(body).build())
    .map((mailto, index) => {
      return <a key={index} href={mailto}>Click here</a>;
    });
}

private getCustomBody(customer) {
  // ... Custom logic
}
```

# Next steps

1. I haven't conducted performance testing
1. If you are using strange emails, like `joe@xyz.com&cc=bob@xyz.com&body=hello` that are technically supported by [RFC2368](https://tools.ietf.org/html/rfc2368), this library might not be right for you. Need to investigate more how to augment `encodeURI` or `encodeURIComponent` to support:
```
Within mailto URLs, the characters "?", "=", "&" are reserved.

Because the "&" (ampersand) character is reserved in HTML, any mailto
URL which contains an ampersand must be spelled differently in HTML
than in other contexts.  A mailto URL which appears in an HTML
document must use "&amp;" instead of "&".
```