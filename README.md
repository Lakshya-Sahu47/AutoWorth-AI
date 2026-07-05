# AutoWorth AI

An AI-powered used car valuation platform trained on a unified dataset created by combining multiple publicly available Kaggle datasets.

**Author:** Kushagra Bhargava
**Reg No:** 23BAI10987

---

## Overview

AutoWorth AI predicts the fair resale value of a used car from a small set of
inputs — present (ex-showroom) price, kilometers driven, fuel type, seller
type, transmission, ownership history, and vehicle age. The underlying
regression model is trained in a dedicated Jupyter/Colab notebook on data
merged from several public Kaggle sources, then served through a Flask web
application.

## Features

- Multi-source dataset integration
- Automatic dataset download
- Data cleaning and preprocessing
- Feature engineering
- Multiple regression model comparison
- Hyperparameter tuning
- Flask backend
- SQLite prediction history
- Dashboard
- REST API
- PDF report generation
- Render deployment

## Project Structure

```
AutoWorth-AI/
├── AutoWorth_AI_Car_Price_Model.ipynb   # End-to-end ML pipeline (this repo's notebook)
├── car_price_model.pkl                  # Final trained model consumed by the Flask app
├── app.py                               # Flask backend
├── templates/                           # HTML templates
├── static/                              # CSS/JS assets
└── README.md
```

## Machine Learning Pipeline

The notebook (`AutoWorth_AI_Car_Price_Model.ipynb`) handles everything needed
to produce `car_price_model.pkl`:

1. **Dataset download** — CarDekho (via `opendatasets`) plus three additional
   Kaggle datasets (via `kagglehub`)
2. **Schema comparison** — every raw column is matched against a canonical
   feature schema using an explicit alias dictionary; datasets that don't
   expose the required fields are excluded and the reason is reported
3. **Cleaning** — duplicate removal, missing-value handling, whitespace/case
   normalization, dtype correction, and removal of impossible values
4. **Standardization** — consistent categorical vocabularies across all
   sources (fuel type, transmission, seller type, etc.)
5. **Merging** — compatible datasets combined into a single master dataframe
6. **Feature engineering** — `Car_Age` and other candidate features
7. **Outlier detection** — IQR + Z-score combined with logical sanity limits
8. **Exploratory data analysis** — correlation heatmap, distributions,
   boxplots, and scatterplots with observations
9. **Model training & comparison** — Linear Regression, Decision Tree,
   Random Forest, Extra Trees, and Gradient Boosting, evaluated with
   MAE / MSE / RMSE / R² / Adjusted R² and 5-fold cross-validation
10. **Hyperparameter tuning** — `RandomizedSearchCV` on the best tree-based
    model
11. **Feature importance** — ranked contribution of each input to price
12. **Model export** — the final estimator is saved with plain `pickle` as
    `car_price_model.pkl`

## Model Input Contract

The Flask application always sends features to the model in this exact
order — the notebook preserves it end-to-end:

```
[Present_Price, Kms_Driven, Fuel_Type, Seller_Type, Transmission, Owner, Car_Age]
```

## Tech Stack

Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Flask, SQLite, Pickle

## Running the Notebook

The notebook is designed to run directly in Google Colab with no manual
downloads:

1. Open `AutoWorth_AI_Car_Price_Model.ipynb` in Colab
2. Run all cells top to bottom (you'll be prompted for a Kaggle API token the
   first time a dataset is downloaded)
3. The final cell writes `car_price_model.pkl` — copy it next to `app.py`

## Deployment

The Flask backend is deployed on Render.
