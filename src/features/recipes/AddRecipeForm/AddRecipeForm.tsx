import { useEffect, useState } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { createRecipe, getIngredients } from '../../../services/recipes';

import type { Ingredient, Option, RecipeFormValues } from '../../../types/recipe';

import CustomSelect from './CustomSelect';
import ImageUploader from './ImageUploader';
import IngredientItem from './IngredientItem';

import css from '../../../pages/AddRecipePage/AddRecipePage.module.css';

const initialValues: RecipeFormValues = {
  image: null,
  title: '',
  description: '',
  category: '',
  area: '',
  time: 10,
  ingredients: [],
  instructions: '',
};

const categoryOptions: Option[] = [
  { _id: 'Beef', name: 'Beef' },
  { _id: 'Breakfast', name: 'Breakfast' },
  { _id: 'Desserts', name: 'Desserts' },
  { _id: 'Lamb', name: 'Lamb' },
  { _id: 'Miscellaneous', name: 'Miscellaneous' },
  { _id: 'Pasta', name: 'Pasta' },
  { _id: 'Pork', name: 'Pork' },
  { _id: 'Seafood', name: 'Seafood' },
  { _id: 'Side', name: 'Side' },
  { _id: 'Starter', name: 'Starter' },
];

const areaOptions: Option[] = [
  { _id: 'French', name: 'French' },
  { _id: 'Spanish', name: 'Spanish' },
  { _id: 'Italian', name: 'Italian' },
  { _id: 'English', name: 'English' },
  { _id: 'Norwegian', name: 'Norwegian' },
  { _id: 'Ukrainian', name: 'Ukrainian' },
];

const validationSchema = Yup.object({
  image: Yup.mixed<File>().required('Upload a photo'),

  title: Yup.string().trim().required('Enter recipe name'),

  description: Yup.string().trim().required('Enter description').max(200, 'Maximum 200 characters'),

  category: Yup.string().required('Select category'),

  area: Yup.string().required('Select area'),

  time: Yup.number().required('Enter cooking time').min(1, 'Minimum 1 minute'),

  ingredients: Yup.array()
    .min(1, 'Add at least one ingredient')
    .required('Add at least one ingredient'),

  instructions: Yup.string()
    .trim()
    .required('Enter recipe preparation')
    .max(1000, 'Maximum 1000 characters'),
});

export default function AddRecipeForm() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientId, setIngredientId] = useState('');
  const [measure, setMeasure] = useState('');
  const [notification, setNotification] = useState('');
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadIngredients = async () => {
      try {
        setIsLoadingIngredients(true);

        const data = await getIngredients();

        console.log('INGREDIENTS FROM API:', data);

        if (!isMounted) {
          return;
        }

        if (!Array.isArray(data)) {
          setIngredients([]);
          setNotification('Could not load ingredients.');
          return;
        }

        setIngredients(data);
      } catch (error) {
        console.error('FAILED TO LOAD INGREDIENTS:', error);

        if (isMounted) {
          setIngredients([]);
          setNotification('Could not load ingredients.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingIngredients(false);
        }
      }
    };

    loadIngredients();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (
    values: RecipeFormValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<RecipeFormValues>,
  ) => {
    try {
      setNotification('');

      if (!values.ingredients.length) {
        setFieldTouched('ingredients', true);
        setNotification('Add at least one ingredient.');
        return;
      }

      const ingredientsPayload = values.ingredients.map((item) => ({
        id: String(item.id),
        measure: String(item.measure).trim(),
      }));

      const invalidIngredient = ingredientsPayload.some(
        (item) => !item.id || item.id === 'undefined' || item.id === 'null' || !item.measure,
      );

      if (invalidIngredient) {
        console.error('INVALID INGREDIENT PAYLOAD:', ingredientsPayload);

        setNotification('One or more ingredients have an invalid ID.');

        return;
      }

      const formData = new FormData();

      if (values.image instanceof File) {
        formData.append('thumb', values.image);
      }

      formData.append('title', values.title.trim());

      formData.append('description', values.description.trim());

      formData.append('category', values.category);

      formData.append('area', values.area);

      formData.append('time', String(values.time));

      formData.append('instructions', values.instructions.trim());

      formData.append('ingredients', JSON.stringify(ingredientsPayload));

      console.log('========== FORM DATA ==========');

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log('INGREDIENTS PAYLOAD:', ingredientsPayload);

      console.log('VALUES INGREDIENTS:', values.ingredients);

      console.log('===============================');

      const recipe = await createRecipe(formData);

      console.log('RECIPE CREATED:', recipe);

      const recipeId = recipe?.id;

      if (!recipeId) {
        console.error('API RESPONSE DOES NOT CONTAIN RECIPE ID:', recipe);

        throw new Error('Recipe ID was not returned by API');
      }

      navigate(`/recipe/${recipeId}`);
    } catch (error: any) {
      console.error('CREATE RECIPE FAILED:', error);

      const apiError = error?.response?.data?.error;

      const apiDetails = error?.response?.data?.details;

      console.error('API ERROR:', apiError);

      console.error('API DETAILS:', apiDetails);

      if (apiError) {
        setNotification(apiError);
      } else if (error?.message) {
        setNotification(error.message);
      } else {
        setNotification('Could not publish recipe. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 
          NOTIFICATION
       */}

      {notification && (
        <div className={css.notification} role="alert">
          <span>{notification}</span>

          <button type="button" aria-label="Close notification" onClick={() => setNotification('')}>
            ×
          </button>
        </div>
      )}

      <Formik<RecipeFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldTouched,
          setFieldValue,
          resetForm,
          isSubmitting,
        }) => {
          /* 
             ADD INGREDIENT
           */

          const addIngredient = () => {
            if (!ingredientId) {
              setNotification('Select an ingredient.');

              return;
            }

            if (!measure.trim()) {
              setNotification('Enter ingredient quantity.');

              return;
            }

            console.log('SELECTED INGREDIENT ID:', ingredientId);

            console.log('AVAILABLE INGREDIENTS:', ingredients);

            const ingredient = ingredients.find(
              (item) => String(item._id) === String(ingredientId),
            );

            if (!ingredient) {
              console.error('INGREDIENT NOT FOUND:', {
                ingredientId,
                ingredients,
              });

              setNotification('Selected ingredient was not found.');

              return;
            }
            const ingredientDbId = String(ingredient._id);

            if (!ingredientDbId || ingredientDbId === 'undefined' || ingredientDbId === 'null') {
              console.error('INVALID INGREDIENT ID:', ingredient);

              setNotification('Selected ingredient has an invalid ID.');

              return;
            }

            const alreadyAdded = values.ingredients.some(
              (item) => String(item.id) === ingredientDbId,
            );

            if (alreadyAdded) {
              setNotification('This ingredient has already been added.');

              return;
            }

            const newIngredient = {
              id: ingredientDbId,
              name: ingredient.name,
              image: ingredient.img ?? '',
              measure: measure.trim(),
            };

            console.log('ADDING INGREDIENT:', newIngredient);

            setFieldValue('ingredients', [...values.ingredients, newIngredient], true);

            setIngredientId('');
            setMeasure('');
            setNotification('');

            setFieldTouched('ingredients', true, false);
          };

          /* 
             DELETE INGREDIENT
           */

          const deleteIngredient = (id: string) => {
            setFieldValue(
              'ingredients',
              values.ingredients.filter((ingredient) => String(ingredient.id) !== String(id)),
            );
          };

          /* 
             RESET
        */

          const reset = () => {
            resetForm();

            setIngredientId('');
            setMeasure('');
            setNotification('');
          };

          /*
             RETURN
          */

          return (
            <Form className={css.form} noValidate>
              <div className={css.grid}>
                {/* 
                    IMAGE
                */}

                <ImageUploader
                  file={values.image}
                  onChange={(file) => {
                    setFieldValue('image', file);

                    setFieldTouched('image', true);
                  }}
                  error={touched.image ? errors.image : undefined}
                />

                <div className={css.fields}>
                  {/* 
                      TITLE
                   */}

                  <label className={css.textField}>
                    <span className={css.nameLabel}>THE NAME OF THE RECIPE</span>

                    <input
                      name="title"
                      value={values.title}
                      placeholder="Enter recipe name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.title && errors.title ? css.invalidLine : ''}
                    />

                    {touched.title && errors.title && <p className={css.error}>{errors.title}</p>}
                  </label>

                  {/* 
                      DESCRIPTION
                   */}

                  <label className={css.textField}>
                    <span className={css.inputLine}>
                      <input
                        name="description"
                        value={values.description}
                        maxLength={200}
                        placeholder="Enter a description of the dish"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.description && errors.description ? css.invalidLine : ''}
                      />

                      <em>
                        {values.description.length}
                        /200
                      </em>
                    </span>

                    {touched.description && errors.description && (
                      <p className={css.error}>{errors.description}</p>
                    )}
                  </label>

                  {/* 
                      CATEGORY + TIME
                   */}

                  <div className={css.categoryRow}>
                    <CustomSelect
                      label="CATEGORY"
                      value={values.category}
                      options={categoryOptions}
                      placeholder="Select a category"
                      onChange={(value) => {
                        setFieldValue('category', value);

                        setFieldTouched('category', true);
                      }}
                      error={touched.category ? errors.category : undefined}
                    />

                    <div>
                      <p className={css.label}>COOKING TIME</p>

                      <div className={css.time}>
                        <button
                          type="button"
                          onClick={() => setFieldValue('time', Math.max(1, values.time - 1))}
                        >
                          −
                        </button>

                        <span>{values.time} min</span>

                        <button
                          type="button"
                          onClick={() => setFieldValue('time', values.time + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 
                      AREA
                   */}

                  <CustomSelect
                    label="AREA"
                    value={values.area}
                    options={areaOptions}
                    placeholder="Area"
                    onChange={(value) => {
                      setFieldValue('area', value);

                      setFieldTouched('area', true);
                    }}
                    error={touched.area ? errors.area : undefined}
                  />

                  {/* 
                      INGREDIENTS
                   */}

                  <section className={css.ingredients}>
                    <h2>INGREDIENTS</h2>

                    <div className={css.ingredientControls}>
                      <CustomSelect
                        value={ingredientId}
                        options={ingredients}
                        placeholder={
                          isLoadingIngredients ? 'Loading ingredients...' : 'Add the ingredient'
                        }
                        onChange={setIngredientId}
                      />

                      <input
                        value={measure}
                        placeholder="Enter quantity"
                        onChange={(event) => setMeasure(event.target.value)}
                      />
                    </div>

                    <button
                      className={css.addButton}
                      type="button"
                      onClick={addIngredient}
                      disabled={isLoadingIngredients || !ingredientId || !measure.trim()}
                    >
                      ADD INGREDIENT <span>＋</span>
                    </button>

                    {touched.ingredients && typeof errors.ingredients === 'string' && (
                      <p className={css.error}>{errors.ingredients}</p>
                    )}

                    <ul className={css.ingredientList}>
                      {values.ingredients.map((item) => (
                        <IngredientItem key={item.id} item={item} onDelete={deleteIngredient} />
                      ))}
                    </ul>
                  </section>

                  {/* 
                      INSTRUCTIONS
                   */}

                  <label className={css.textField}>
                    <span className={css.label}>RECIPE PREPARATION</span>

                    <span className={css.inputLine}>
                      <textarea
                        name="instructions"
                        value={values.instructions}
                        maxLength={1000}
                        placeholder="Enter recipe"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.instructions && errors.instructions ? css.invalidLine : ''
                        }
                      />

                      <em>
                        {values.instructions.length}
                        /1000
                      </em>
                    </span>

                    {touched.instructions && errors.instructions && (
                      <p className={css.error}>{errors.instructions}</p>
                    )}
                  </label>

                  {/* 
                      ACTIONS
                   */}

                  <div className={css.actions}>
                    <button
                      type="button"
                      className={css.resetButton}
                      aria-label="Reset form"
                      onClick={reset}
                    >
                      🗑
                    </button>

                    <button
                      type="submit"
                      className={css.publishButton}
                      disabled={isSubmitting || isLoadingIngredients}
                    >
                      {isSubmitting ? 'PUBLISHING...' : 'PUBLISH'}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
