import express from "express"
import Category from "../models/CategoryModel.js"
const router = express.Router();

// Lấy tất cả danh mục
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm danh mục mới
router.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
    subCategories: req.body.subCategories,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật danh mục
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa danh mục
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm subCategory vào danh mục
router.post("/:categoryId/subcategories", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });
    
    category.subCategories.push(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật subCategory
router.put("/:categoryId/subcategories/:subId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const subCategory = category.subCategories.id(req.params.subId);
    if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

    subCategory.set(req.body);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa subCategory
router.delete("/:categoryId/subcategories/:subId", async (req, res) => {
  try {
    console.log(`Attempting to delete subCategory with ID ${req.params.subId} from category ${req.params.categoryId}`);
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      console.error("Category not found");
      return res.status(404).json({ message: "Category not found" });
    }

    const subCategory = category.subCategories.id(req.params.subId);
    if (!subCategory) {
      console.error("SubCategory not found");
      return res.status(404).json({ message: "SubCategory not found" });
    }

    // Sử dụng phương thức pull để xóa subCategory
    category.subCategories.pull({ _id: req.params.subId });
    await category.save();
    console.log("SubCategory deleted successfully");
    res.json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subCategory:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
