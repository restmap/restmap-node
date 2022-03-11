### restmap
![logo](https://avatars.githubusercontent.com/u/80530774?s=200)

[![npm](https://img.shields.io/npm/v/@restmap/node)](https://npmjs.com/package/@restmap/node)  ![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555) [![CI](https://github.com/restmap/restmap-node/actions/workflows/ci.yml/badge.svg)](https://github.com/restmap/restmap-node/actions/workflows/ci.yml)  [![codecov](https://codecov.io/gh/restmap/restmap-node/branch/deploy/graph/badge.svg)](https://codecov.io/gh/restmap/restmap-node)   [![Buy us a tree](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=Treeware&query=%24.total&url=https%3A%2F%2Fpublic.offset.earth%2Fusers%2Ftreeware%2Ftrees)](https://plant.treeware.earth/dawnimpulse/restmap) ![NPM](https://img.shields.io/npm/l/error-key) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

### Goal
To create a simple way to query only the required data from a **Rest API** without relying on lot of external tools or code.

> This project is inspired from GraphQl

But unlike graphql which is itself a whole new query language, **restmap** aims to create a much simpler approach (for reducing data) where you just write a simple string which is used to parse and minify the data.

### Why replace GraphQl ?

In no way restmap is replacement for GraphQl which is a very extensive query language that do a lot of things.

> Restmap solely aims to limit your data without lots of development time on fronend/backend. All you need is just few lines of code on server side

* Graphql requires you to configure/change a lot of your frontend & backend.
* For Graphql in frontend specially you need a new way to consume data by configuring a new library other than existing REST api which put additional strain on frontend devs.

### Working of Restmap ?

* Restmap simply works in existing api by making a slight tweak on server side
* Just import the library and call the reduce method on final output of your api
* Clients can send **restmap string** via header, query or body (however you wish to have it on server side)

### Example
> Checkout the [Playground](https://restmap.vercel.app/playground)
#### Example 1
```
{
	"rest" : {
		"query: {
			"lang" : "",
			"map" : "",
			"name" : "",
			"age" : 2
		}
	}
}
```
Now if I just want 2 keys inside query, we can write a special **restmap string**

> **`{rest{query{lang,map}}}`**

which will return only the required data
```
{
	"rest" : {
		"query: {
			"lang" : "",
			"map" : ""
		}
	}
}
```

#### Example 2 (escape)
```
{
	"rest" : {
		"query": {
			"lang" : "",
			"map" : "",
			"name" : "",
			"age" : 2,
			"something" : {
				"good": true,
				"is" : true,
				"here" : true
			}
		},		
	}
}
```
What is we need to remove just 1 or 2 keys and return all other keys.
Suppose I need all keys inside `rest.query` except `lang` & `map` while also reducing `rest.query.something`

> **`{rest{query{-lang,-map,something{good}}}}`**
`-` marks the key as an escape key (you can also customize it; read more below)

which will return only the required data
```
{
	"rest" : {
		"query: {
			"name" : "",
			"age" : 2,
			"something" : {
				"good": true
			}
		},		
	}
}
```

### How to use
> The goal is to make it as simple as possible for both frontend (mainly) and backend devs
- One of the way is to ask the client/frontend to send the map via header `restmap` param (again completely upto you which way you want the map - header, query or body).
- On server you can check whether client has send the `restmap` or not & perform accordingly.
- You can do either this per route or you can create a middleware out of it.
- Wait for the normal response of your api & before sending the data to client you can simply check for `restmap` param if it exists, verify the map (if u want) & then send the `reduceData` output

> My advice is to create a middleware in express/hapi/koa so don't have to do this manually in each route. Will soon release a package for that as well. For time being, you can check the `examples` folder for middleware implementation.

### Methods
#### Parsing/Reducing the data
> `reduceData()`

|params| |description|
|--|--|--|
|restmap| required |restmap string to reduce the data|
|data| required | the actual data to be reduced|
|escape| optional | to identify a key as escape key; **default is `-`**|
|unavailable| optional | if a key is provided in restmap but doesn't exist in actual data then this will be the value of that key; **default is `{}`**|

- **@return** `object` : reduced/parsed data
- **@description** : To parse the data according to our requirement we can pass out map & original data directly to `reduceData(map,data)` function which will return the expected output

#### Verifying the map
> `verifyMap()`

|params||description|
|--|--|--|
| restmap | required | the restmap string you need to validate |

- **@return** `boolean`
- **@description** : You can verify either the map is valid or not

#### Generating the map
> `generateMap()`

To be honest, **restmap string** is very easy to write !! Although I agree that in complex data with lots of keys and nesting it can be a big trouble. This function is all you need in that case. To make it more easier for you, you can do this on web via [Playground](https://restmap.web.app/playground)

|params||description|
|--|--|--|
| data | required | json object/array to be converted |

- **@return** `string`  : the restmap string
- **@description** :  The map is generated by providing the required json object in the `generateMap()` function. Basically the map is a simple json removing all double quotes and end values + replacing array with object notation i.e. you can treat it something really similar to **graphql queries** without extra spaces or anything.

### Future
The project is currently in beta stage but the results are very promising and the library can be used in production environment. It would be great that collaboratively we all will test more for edge cases.

### What needs to be improved/added
> It would be amazing to have community support for testing & working out more features

* Creating middleware for express/koa/hapi etc
* Porting the library in other languages eg. python
* Improving algorithm for all tasks like generating map, parsing map & reducing data

### Contact
I am always available for QAs. You can reach via following -

+ Twitter - [@dawnimpulse](https://twitter.com/dawnimpulse)
+ Email - [dawnimpulse@gmail.com](mailto:dawnimpulse@gmail.com)

### Treeware
This package is [Treeware](https://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/dawnimpulse/restmap) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.

### License
I used a very open license which grants you to use this libary in personal/commerical use without any fees/declaration etc. (but don't sell it claiming as your own)

```
ISC License  
  
Copyright 2021-2022, Saksham Khurana (DawnImpulse)  
  
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,  
provided that the above copyright notice and this permission notice appear in all copies.  
  
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL  
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,  
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,  
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE  
OR PERFORMANCE OF THIS SOFTWARE.
```
> Written with [StackEdit](https://stackedit.io/).