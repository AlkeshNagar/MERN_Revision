# MongoDB Indexing (Complete MERN Interview Notes)

## What is an Index?

An **Index** is a special data structure that stores **field values along with pointers (references) to their documents**, allowing MongoDB to find data quickly without scanning the entire collection.

Without an index, MongoDB performs a **COLLSCAN (Collection Scan)**, meaning it checks every document one by one.

### Real-Life Analogy

- **Without Index:** Reading every page of a book to find one topic.
- **With Index:** Using the book's index to jump directly to the correct page.

### Internal Working

```
Collection

Doc1 {_id:1, email:"a@gmail.com"}
Doc2 {_id:2, email:"b@gmail.com"}
Doc3 {_id:3, email:"c@gmail.com"}

Email Index

a@gmail.com → Doc1
b@gmail.com → Doc2
c@gmail.com → Doc3
```

MongoDB first searches the index, gets the document pointer, and then fetches the actual document.

---

## Why Use Indexes?

- Faster `find()` queries
- Faster filtering
- Faster sorting
- Enforce uniqueness
- Automatic expiration of temporary documents (TTL)

### Drawbacks

- Uses additional storage.
- Inserts, updates, and deletes become slightly slower because indexes also need updating.

---

# Types of Indexes

## 1. Single Field Index

The simplest index created on a single field.

MongoDB automatically creates a single-field index on `_id` for every collection.

```javascript
db.users.createIndex({ username: 1 });
```

- `1` → Ascending
- `-1` → Descending

### Best Use Cases

- Username lookup
- Email search
- Phone number lookup

---

## 2. Compound Index

A compound index is built on multiple fields.

```javascript
db.orders.createIndex({
    status: 1,
    totalAmount: -1
});
```

### Why Field Order Matters

Index:

```javascript
{ status:1, totalAmount:-1 }
```

Efficient:

```javascript
db.orders.find({ status:"pending" });

db.orders.find({ status:"pending" })
         .sort({ totalAmount:-1 });
```

Less efficient:

```javascript
db.orders.find({ totalAmount:500 });
```

because the first indexed field (`status`) isn't used.

### Leftmost Prefix Rule

A compound index can efficiently use its fields from **left to right**.

Example:

```javascript
{ status:1, age:1, city:1 }
```

Works efficiently for:

- `{status}`
- `{status, age}`
- `{status, age, city}`

Not ideal for:

- `{age}`
- `{city}`

---

## ESR Rule (Equality → Sort → Range)

When designing compound indexes, follow:

- **E = Equality**
- **S = Sort**
- **R = Range**

Example:

```javascript
db.orders.find({
    status:"pending",
    total:{$gt:500}
}).sort({createdAt:-1});
```

Best index:

```javascript
db.orders.createIndex({
    status:1,
    createdAt:-1,
    total:1
});
```

Reason:

1. Equality (`status`)
2. Sort (`createdAt`)
3. Range (`total > 500`)

---

## 3. Unique Index

Prevents duplicate values.

```javascript
db.users.createIndex(
    { email:1 },
    { unique:true }
);
```

Now MongoDB rejects duplicate emails.

Example:

```javascript
{ email:"abc@gmail.com" }
{ email:"abc@gmail.com" } ❌ Duplicate
```

### Common Uses

- Email
- Username
- Phone Number

---

## 4. TTL (Time-To-Live) Index

Automatically deletes expired documents.

```javascript
db.sessions.createIndex(
    { createdAt:1 },
    { expireAfterSeconds:3600 }
);
```

### How It Works

Every document gets an expiry time.

```
Expiry Time = createdAt + 3600 seconds
```

After one hour, the document becomes **eligible** for deletion.

### Who Deletes It?

MongoDB automatically deletes it.

A background process called the **TTL Monitor** runs approximately every **60 seconds**, finds expired documents, and removes them.

### Internal Working

Before Expiry:

```
Collection

DocA
DocB
DocC

TTL Index

10:00 → DocA
10:30 → DocB
11:00 → DocC
```

After Expiry:

```
Collection

DocB
DocC

TTL Index

10:30 → DocB
11:00 → DocC
```

The document is automatically removed from both the collection and the TTL index.

### Common Uses

- User Sessions
- OTPs
- Password Reset Tokens
- Temporary Logs

**Interview Fact:** Documents are not deleted exactly after 3600 seconds. They become eligible after that time, and the TTL Monitor deletes them during its next scan.

---

## 5. Multikey Index

A Multikey Index is automatically created when indexing an **array field**.

```javascript
db.products.createIndex({ tags:1 });
```

Document:

```javascript
{
    name:"Laptop",
    tags:["electronics","gaming","office"]
}
```

Internally, MongoDB indexes each array element separately.

```
electronics → Laptop

gaming → Laptop

office → Laptop
```

Query:

```javascript
db.products.find({
    tags:"gaming"
});
```

### Common Uses

- Product Tags
- Skills
- Categories
- Interests

---

## 6. Text Index

A **Text Index** is used for **full-text searching**, where MongoDB searches meaningful words instead of exact string matches.

```javascript
db.users.createIndex({
    bio:"text"
});
```

### How Text Index Works

Suppose your documents are:

```javascript
{
    name:"Rahul",
    bio:"I like riding bike."
}

{
    name:"Aman",
    bio:"I like to gaming."
}
```

When MongoDB builds the Text Index, it doesn't store every word exactly as written.

Instead, it performs **tokenization**.

#### Step 1: Split into Words (Tokenization)

```
"I like riding bike"

↓

I
like
riding
bike
```

#### Step 2: Remove Stop Words

Common words that carry little search meaning are ignored.

Examples:

- I
- a
- an
- the
- is
- to
- of
- in
- as
- and

Result:

```
like
riding
bike
```

#### Step 3: Stemming

MongoDB reduces words to their root form.

Examples:

| Original | Stored Root |
|----------|------------|
| riding | ride |
| bikes | bike |
| gaming | game |
| played | play |
| running | run |

So internally:

```
Document 1

ride
bike

Document 2

game
```

The Text Index stores these meaningful root words with pointers to their documents.

### Searching

```javascript
db.users.find({
    $text:{
        $search:"bike"
    }
});
```

Result:

Returns documents containing **bike**, **bikes**, or related stemmed forms.

Search:

```javascript
db.users.find({
    $text:{
        $search:"game"
    }
});
```

Matches:

- gaming
- game
- games

### Important Characteristics

- Removes common stop words.
- Performs stemming.
- Case-insensitive.
- Word-order generally doesn't matter.

### Common Uses

- Blog Search
- News Search
- Documentation Search
- Product Description Search

---

# Managing Indexes

## Create an Index

```javascript
db.users.createIndex({ email:1 });
```

## View All Indexes

```javascript
db.users.getIndexes();
```

Example Output:

```
_id_
email_1
username_1
```

## Drop One Index

```javascript
db.users.dropIndex("email_1");
```

## Drop All Indexes

```javascript
db.users.dropIndexes();
```

MongoDB never removes the `_id` index.

---

# Verify Whether MongoDB Used Your Index

Never assume an index is working.

Use:

```javascript
db.users.find({
    email:"test@gmail.com"
}).explain("executionStats");
```

### Important Output

| Stage | Meaning |
|--------|---------|
| `COLLSCAN` | Full Collection Scan ❌ |
| `IXSCAN` | Index Scan ✅ |

Also check:

```
totalDocsExamined
```

Ideal Output:

```
stage: "IXSCAN"

totalDocsExamined:1
```

This means MongoDB directly reached the required document.

---

# When MongoDB Uses Indexes

Indexes are commonly used for:

- `find()`
- `findOne()`
- `sort()`
- Range queries (`$gt`, `$lt`, `$gte`, `$lte`)
- Optimizing joins (`$lookup` when indexed fields are used)

Example:

```javascript
db.users.find({
    age:{$gt:25}
}).sort({age:1});
```

An index on `age` helps both filtering and sorting.

---

# Performance Example

Without Index:

```javascript
db.users.find({
    email:"abc@gmail.com"
});
```

```
Documents Checked:100000

Time: Slow
```

With Index:

```javascript
db.users.createIndex({
    email:1
});
```

Same Query:

```
Documents Checked:1

Time: Fast
```

Instead of scanning every document, MongoDB uses the index, follows the document pointer, and retrieves the result almost instantly.

---

# Quick Interview Revision (One-Liners)

- Index stores **field values + document pointers**.
- `_id` index is created automatically.
- `1` = ascending, `-1` = descending.
- Compound indexes follow the **Leftmost Prefix Rule**.
- ESR = **Equality → Sort → Range**.
- Unique indexes prevent duplicate values.
- TTL indexes delete **documents**, not the index itself.
- TTL Monitor runs roughly every **60 seconds**.
- Multikey indexes are for array fields.
- Text indexes remove stop words, perform stemming, and support `$text` searches.
- Use `.explain("executionStats")` to verify `IXSCAN` instead of `COLLSCAN`.