# How to Push Changes to GitHub

## Quick Reference (Copy-Paste)

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
git add .
git commit -m "Your message here"
git push
```

---

## Step-by-Step Explanation

### Step 1: Go to the project folder

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
```

**What it does:** Opens the website folder where your code lives.

---

### Step 2: Stage your changes

```bash
git add .
```

**What it does:** Tells Git "I want to save these files." The `.` means "all files I changed."

**What gets included?**
- ✅ Your code changes
- ✅ New files you added
- ❌ `node_modules/` (automatically excluded by `.gitignore`)
- ❌ `.next/` cache (automatically excluded by `.gitignore`)

---

### Step 3: Create a checkpoint (commit)

```bash
git commit -m "Describe what you changed"
```

**What it does:** Saves a snapshot of your changes with a description.

**Examples:**
```bash
git commit -m "Updated team members"
git commit -m "Changed contact phone number"
git commit -m "Added new service"
git commit -m "Updated brand colors"
git commit -m "Fixed navigation links"
```

**Pro tip:** Make your message short and clear so you know what changed.

---

### Step 4: Push to GitHub

```bash
git push
```

**What it does:** Uploads your changes to GitHub.

---

## All Together (First Time)

If you're setting up on a new machine, run these once:

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
gh auth login -p https -w    # Only once - authorize with GitHub
git push
```

---

## Common Scenarios

### I edited `src/data/site-data.ts` and want to save

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
git add .
git commit -m "Updated team member info"
git push
```

### I changed the logo and contact info

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
git add .
git commit -m "Updated logo and contact details"
git push
```

### I want to see what changed before pushing

```bash
git status      # Shows what files changed
git diff        # Shows exact changes in files
```

---

## Check Your Push on GitHub

After `git push` succeeds, go here to see your changes:
https://github.com/kartikc26/SoChillMedia

---

## If Something Goes Wrong

**Error: "Authentication failed"**
- Run: `gh auth login -p https -w`
- Complete the browser login
- Try `git push` again

**Error: "fatal: not a git repository"**
- Make sure you're in the right folder
- Run: `cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"`

**Error: "nothing to commit"**
- You didn't make any changes
- Or you forgot `git add .`

---

## TL;DR (Too Long; Didn't Read)

Just run this every time you make changes:

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
git add .
git commit -m "Write what you changed here"
git push
```

Done. Your changes are on GitHub.
