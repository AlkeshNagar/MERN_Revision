# MongoDB Aggregation Pipeline Reference Guide

## 1. $match (Filter)
### What it does
Filters documents to pass only those matching specified conditions into the next stage. It acts exactly like a `.find()` query. Always place this at the very top of your pipeline to optimize speed.

### Example
```javascript
db.collection('products').aggregate([
  { $match: { status: "active", price: { $gte: 50 } } }
]);
```

### Output
```json
[
  { "_id": "1", "name": "Gaming Mouse", "status": "active", "price": 60 },
  { "_id": "2", "name": "Mechanical Keyboard", "status": "active", "price": 120 }
]
```

---

## 2. $group (Accumulate & Aggregate)
### What it does
Groups incoming documents by a specified identifier (`_id`) and applies mathematical accumulator expressions like `$sum`, `$avg`, `$max`, or `$min`.

### Example
```javascript
db.collection('products').aggregate([
  { $group: { 
      _id: "$category", 
      totalItems: { $sum: 1 }, 
      avgPrice: { $avg: "$price" } 
  } }
]);
```

### Output
```json
[
  { "_id": "electronics", "totalItems": 2, "avgPrice": 90 },
  { "_id": "clothing", "totalItems": 1, "avgPrice": 25 }
]
```

---

## 3. $project (Reshape & Calculate)
### What it does
Reshapes each document by explicitly adding, removing, renaming, or calculating new fields. Use `1` to include, `0` to exclude.

### Example
```javascript
db.collection('products').aggregate([
  { $project: { 
      _id: 0, 
      productName: "$name", 
      priceWithTax: { $multiply: ["$price", 1.18] } 
  } }
]);
```

### Output
```json
[
  { "productName": "Gaming Mouse", "priceWithTax": 70.8 },
  { "productName": "Mechanical Keyboard", "priceWithTax": 141.6 }
]
```

---

## 4. $lookup (Left Outer Join)
### What it does
Performs a join to another collection in the same database. It fetches matching rows and embeds them as an array inside the current document.

### Example
```javascript
db.collection('orders').aggregate([
  { $lookup: { 
      from: "users", 
      localField: "userId", 
      foreignField: "_id", 
      as: "customerProfile" 
  } }
]);
```

### Output
```json
[
  { 
    "_id": "101", 
    "totalAmount": 150, 
    "userId": "u99", 
    "customerProfile": [{ "_id": "u99", "name": "John Doe", "email": "john@example.com" }] 
  }
]
```

---

## 5. $unwind (Flatten Arrays)
### What it does
Deconstructs an array field from the input documents to output a distinct document for each element in that array.

### Example
```javascript
db.collection('orders').aggregate([
  { $unwind: "$items" }
]);
```

### Output
```json
[
  { "_id": "101", "orderNumber": "A1", "items": "Mouse" },
  { "_id": "101", "orderNumber": "A1", "items": "Keyboard" }
]
```

---

## 6. $sort (Order Results)
### What it does
Reorders the document stream chronologically, alphabetically, or numerically. Use `1` for ascending and `-1` for descending.

### Example
```javascript
db.collection('products').aggregate([
  { $sort: { price: -1 } }
]);
```

### Output
```json
[
  { "_id": "2", "name": "Mechanical Keyboard", "price": 120 },
  { "_id": "1", "name": "Gaming Mouse", "price": 60 }
]
```

---

## 7. $limit (Cap Results)
### What it does
Caps the maximum number of documents allowed to pass out of this stage. Essential for performance and top-N lists.

### Example
```javascript
db.collection('products').aggregate([
  { $limit: 1 }
]);
```

### Output
```json
[
  { "_id": "1", "name": "Gaming Mouse", "price": 60 }
]
```

---

## 8. $skip (Offset Results)
### What it does
Skips over a designated number of documents from the top of the stream. Paired with `$limit` to build pagination links.

### Example
```javascript
db.collection('products').aggregate([
  { $skip: 1 }
]);
```

### Output
```json
[
  { "_id": "2", "name": "Mechanical Keyboard", "price": 120 }
]
```

---

## 9. $addFields / $set (Append Fields)
### What it does
Appends fresh fields to the current document structure while completely preserving all existing properties without declaring them.

### Example
```javascript
db.collection('orders').aggregate([
  { $addFields: { isHighValue: { $gt: ["$totalAmount", 100] } } }
]);
```

### Output
```json
[
  { "_id": "101", "totalAmount": 150, "isHighValue": true }
]
```

---

## 10. $unset (Remove Fields)
### What it does
Removes or strips specific fields away from incoming documents. Useful for omitting secure data before sending responses.

### Example
```javascript
db.collection('users').aggregate([
  { $unset: ["passwordHash", "salt"] }
]);
```

### Output
```json
[
  { "_id": "u99", "name": "John Doe", "email": "john@example.com" }
]
```

---

## 11. $count (Get Stream Total)
### What it does
Counts the total number of documents remaining at this specific stage and outputs a single value mapping to a custom name.

### Example
```javascript
db.collection('products').aggregate([
  { $match: { category: "electronics" } },
  { $count: "totalElectronicsCount" }
]);
```

### Output
```json
[
  { "totalElectronicsCount": 2 }
]
```

---

## 12. $replaceRoot / $replaceWith (Change Document Center)
### What it does
Promotes a nested sub-document to become the absolute top-level root document, discarding the original wrapping layout.

### Example
```javascript
db.collection('stores').aggregate([
  { $replaceWith: "$addressDetails" }
]);
```

### Output
```json
[
  { "city": "Mumbai", "zipcode": "400001", "country": "India" }
]
```

---

## 13. $sortByCount (Group and Count Shortcut)
### What it does
Groups documents by a target property, sums up occurrences, and sorts the final list automatically in descending order.

### Example
```javascript
db.collection('users').aggregate([
  { $sortByCount: "$browser" }
]);
```

### Output
```json
[
  { "_id": "Chrome", "count": 450 },
  { "_id": "Safari", "count": 120 }
]
```

---

## 14. $facet (Parallel Pipelines)
### What it does
Executes multiple independent analytics workflows simultaneously inside a single stage on the exact same matching documents.

### Example
```javascript
db.collection('products').aggregate([
  { $facet: {
      "categories": [ { $group: { _id: "$category", count: { $sum: 1 } } } ],
      "priceStats": [ { $group: { _id: null, max: { $max: "$price" } } } ]
  } }
]);
```

### Output
```json
[
  {
    "categories": [ { "_id": "electronics", "count": 2 } ],
    "priceStats": [ { "_id": null, "max": 120 } ]
  }
]
```

---

## 15. $sample (Random Sampling)
### What it does
Randomly selects a specified number of items from its pipeline input stream. Excellent for feature widgets or homepage recommendations.

### Example
```javascript
db.collection('products').aggregate([
  { $sample: { size: 1 } }
]);
```

### Output
```json
[
  { "_id": "2", "name": "Mechanical Keyboard", "price": 120 }
]
```

---

## 16. $bucket (Manual Range Boundaries)
### What it does
Divides incoming records into distinct groupings based on explicit, manually defined numerical thresholds or ranges.

### Example
```javascript
db.collection('users').aggregate([
  { $bucket: { 
      groupBy: "$age", 
      boundaries: [ 0, 18, 60 ], 
      default: "senior", 
      output: { total: { $sum: 1 } } 
  } }
]);
```

### Output
```json
[
  { "_id": 0, "total": 5 },   // Under 18
  { "_id": 18, "total": 42 }  // 18 to 59
]
```

---

## 17. $bucketAuto (Automatic Range Boundaries)
### What it does
Analyzes the data and automatically distributes the document stream into a defined number of buckets evenly.

### Example
```javascript
db.collection('products').aggregate([
  { $bucketAuto: { groupBy: "$price", buckets: 2 } }
]);
```

### Output
```json
[
  { "_id": { "min": 10, "max": 60 }, "count": 15 },
  { "_id": { "min": 60, "max": 500 }, "count": 15 }
 ]
```

---

## 18. $merge (Upsert to Another Collection)
### What it does
Writes pipeline results directly to another target collection. Instead of wiping it, it matches IDs to merge or update changes.

### Example
```javascript
db.collection('orders').aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$totalAmount" } } },
  { $merge: { into: "user_metrics", on: "_id", whenMatched: "merge", whenNotMatched: "insert" } }
]);
```

### Output
*Modifies or creates rows in the 'user_metrics' collection natively. Returns empty screen payload to Express.*

---

## 19. $out (Overwrite to Another Collection)
**What it does:** Takes the final results of the aggregation pipeline and writes them directly into a brand new database collection. If the target collection already exists, it is completely overwritten and replaced. This must be the absolute last stage in your pipeline.
**When to use:** Creating automated daily snapshot tables, pre-computing heavy analytics reports overnight, or backing up filtered datasets.

```javascript
// Pipeline Setup
db.collection('orders').aggregate([
  { match: status: "completed", date: gte: ISODate("2026-01-01") } } },
  { \$out: "completed_orders_2026_archive" }
]);

// Final Output Structure
// (This stage does not return data to your Express app. Instead, it creates a new collection in MongoDB)
// If you check your database collections, 'completed_orders_2026_archive' will now contain all matching items.
```

---

### 20. `$merge`
**What it does:** Writes the final results of the aggregation pipeline directly into another collection. Instead of wiping out the destination table like `$out`, it performs smart, granular updates (merging new fields, updating matching records based on an ID, or ignoring duplicates).
**When to use:** Incrementally updating a live analytics or reporting collection without rewriting the entire history.

```javascript
// Pipeline Setup
db.collection('daily_sales').aggregate([
  { \$match: { date: ISODate("2026-08-20") } },
  { \(group: { _id: "\)storeId", totalSalesToday: { sum: "amount" } } },
  { \$merge: { 
      into: "store_lifetime_analytics", 
      on: "_id", 
      whenMatched: "merge", 
      whenNotMatched: "insert" 
  } }
]);

// Final Output Structure
// Updates 'store_lifetime_analytics' in place. 
// Existing stores get their sales fields merged; new stores are inserted as fresh records.
```

---

### 21. `$sortByCount`
**What it does:** A specialized shortcut stage that groups documents by a specific property, counts how many items fall into each group, and automatically sorts the final list in descending order. It combines `$group`, `{ $sum: 1 }`, and `$sort` into one line.
**When to use:** Rapidly building "Top Categories", "Most Popular Browsers", or "Most Active Users" leaderboards.

```javascript
// Pipeline Setup
db.collection('users').aggregate([
  { sortByCount: "country" }
]);

// Final Output Structure
[
  { "_id": "India", "count": 1450 },
  { "_id": "USA", "count": 920 },
  { "_id": "Germany", "count": 310 }
]
```

---

### 22. `$sample`
**What it does:** Randomly selects a specified number of documents from the incoming data stream using an internal mathematical randomizer algorithm.
**When to use:** Creating "Random Recommended Products" sections, picking contest winners, or pulling random data sets for QA testing.

```javascript
// Pipeline Setup
db.collection('products').aggregate([
  { \$match: { category: "clothing", stock: { \(gt: 10 } } },   {\)sample: { size: 2 } }
]);

// Final Output Structure
[
  { "_id": ObjectId("64e29b1f7e3a2b1c8d9e0f11"), "name": "Classic Denim Jacket", "price": 89 },
  { "_id": ObjectId("64e29b1f7e3a2b1c8d9e0f99"), "name": "Graphic Summer Tee", "price": 25 }
]
```

---

### 23. `$redact`
**What it does:** Restricts access or blocks specific fields/objects within a document based on system permissions metadata stored directly inside the content properties. It evaluates a conditional statement to decide whether to keep or remove data.
**When to use:** Stripping out confidential fields or restricted items from a response depending on the current user's security level.

```javascript
// Pipeline Setup
db.collection('documents').aggregate([
  { \(redact: {\)cond: {
        if: { \(in: [ "manager", "\)viewableByRoles" ] },
        then: "\[DESCEND", // Keep this level and keep checking sub-objects         else: "\]PRUNE"    // Completely remove this object/field from the results
      }
  } }
]);

// Final Output Structure
[
  { 
    "_id": ObjectId("64e29b1f7e3a2b1c8d9e0f33"), 
    "title": "Q3 Financial Plan", 
    "viewableByRoles": ["admin", "manager"] 
  }
]
```

---

### 24. `$unionWith`
**What it does:** Combines data records from two completely different collections together into a single unified output stream. It works identically to a `UNION` or `UNION ALL` statement in traditional SQL.
**When to use:** Merging historic logs from an archive collection with active logs from a live production collection into a single view.

```javascript
// Pipeline Setup
db.collection('active_users').aggregate([
  { \$project: { email: 1, status: "active" } },
  { \$unionWith: { 
      coll: "archived_users", 
      pipeline: [ { \$project: { email: 1, status: "archived" } } ] 
  } }
]);

// Final Output Structure
[
  { "_id": ObjectId("1111"), "email": "live_user@gmail.com", "status": "active" },
  { "_id": ObjectId("2222"), "email": "old_user@gmail.com", "status": "archived" }
]
```

---

### 25. `$search`
**What it does:** Performs high-performance, full-text search queries against your data fields. It supports fuzzy matching, auto-complete, and relevance scoring. **Note: This must always be the absolute first stage in your pipeline, and it is exclusive to MongoDB Atlas.**
**When to use:** Building advanced search bars that handle typos, plurals, and contextual synonyms across your entire product catalogue.

```javascript
// Pipeline Setup
db.collection('products').aggregate([
  { \$search: {
      text: {
        query: "lether jackt", // Intentional typos
        path: "description"    // Field targeted by search index
      }
  } },
  { \$limit: 1 }
]);

// Final Output Structure
[
  { 
    "_id": ObjectId("64e29b1f7e3a2b1c8d9e0f55"), 
    "name": "Vintage Leather Jacket", 
    "description": "High-quality genuine black leather jacket for winter." 
  }
]
```
