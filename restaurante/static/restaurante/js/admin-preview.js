(function($) {
    'use strict';

    let cropper = null;

    // Función para actualizar la vista previa
    function updatePreview() {
        const nombre = $('#id_nombre').val() || 'Nombre del Plato';
        const descripcion = $('#id_descripcion').val() || 'Descripción del plato aparecerá aquí';
        const precio = $('#id_precio').val() || '0';
        
        $('#previewNombre').text(nombre);
        $('#previewDescripcion').text(descripcion);
        $('#previewPrecio').text('$' + parseFloat(precio).toFixed(0));
    }

    // Función para actualizar la imagen de vista previa
    function updatePreviewImage() {
        const imagenInput = document.getElementById('id_imagen');
        const previewImage = document.getElementById('previewImage');
        const previewPlaceholder = document.getElementById('previewPlaceholder');
        
        if (imagenInput && imagenInput.files && imagenInput.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                previewPlaceholder.style.display = 'none';
                
                // Mostrar botón de recorte si hay imagen
                showCropButton();
            };
            
            reader.readAsDataURL(imagenInput.files[0]);
        } else if (previewImage.src && !previewImage.src.includes('placeholder')) {
            // Si hay una imagen existente, mantenerla
            previewImage.style.display = 'block';
            previewPlaceholder.style.display = 'none';
            showCropButton();
        } else {
            previewImage.style.display = 'none';
            previewPlaceholder.style.display = 'flex';
            hideCropButton();
        }
    }

    // Mostrar botón de recorte
    function showCropButton() {
        let cropButton = document.getElementById('cropButton');
        if (!cropButton) {
            const imagenField = document.querySelector('.field-imagen');
            if (imagenField) {
                cropButton = document.createElement('button');
                cropButton.type = 'button';
                cropButton.id = 'cropButton';
                cropButton.className = 'image-crop-trigger';
                cropButton.textContent = 'Ajustar/Recortar Imagen';
                imagenField.appendChild(cropButton);
                
                cropButton.addEventListener('click', function() {
                    initCropper();
                });
            }
        }
    }

    // Ocultar botón de recorte
    function hideCropButton() {
        const cropButton = document.getElementById('cropButton');
        if (cropButton) {
            cropButton.remove();
        }
    }

    // Inicializar el cropper
    function initCropper() {
        const imagenInput = document.getElementById('id_imagen');
        const cropperSection = document.getElementById('cropperSection');
        const imageToCrop = document.getElementById('imageToCrop');
        const previewImage = document.getElementById('previewImage');
        
        // Verificar si hay imagen
        let hasImage = false;
        if (imagenInput && imagenInput.files && imagenInput.files[0]) {
            hasImage = true;
        } else if (previewImage && previewImage.src && !previewImage.src.includes('placeholder') && previewImage.style.display !== 'none') {
            hasImage = true;
        }
        
        if (!hasImage) {
            alert('Por favor, selecciona una imagen primero.');
            return;
        }

        // Obtener la imagen actual
        let imageSrc = '';
        if (imagenInput.files && imagenInput.files[0]) {
            imageSrc = URL.createObjectURL(imagenInput.files[0]);
        } else if (previewImage && previewImage.src) {
            imageSrc = previewImage.src;
        }

        imageToCrop.src = imageSrc;
        cropperSection.style.display = 'block';
        
        // Scroll a la sección de recorte
        cropperSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Destruir cropper anterior si existe
        if (cropper) {
            cropper.destroy();
        }

        // Inicializar nuevo cropper
        cropper = new Cropper(imageToCrop, {
            aspectRatio: 4 / 3,
            viewMode: 1,
            guides: true,
            background: false,
            autoCropArea: 0.8,
            responsive: true,
            restore: false,
            checkCrossOrigin: false
        });
    }

    // Aplicar recorte
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'applyCrop') {
            if (!cropper) {
                alert('No hay imagen para recortar.');
                return;
            }

            const canvas = cropper.getCroppedCanvas({
                width: 800,
                height: 600,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high'
            });

            canvas.toBlob(function(blob) {
                const fileInput = document.getElementById('id_imagen');
                const file = new File([blob], 'plato-recortado.jpg', { type: 'image/jpeg' });
                
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;
                
                // Disparar evento change para actualizar la vista previa
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
                
                // Cerrar cropper
                cancelCrop();
            }, 'image/jpeg', 0.9);
        }

        if (e.target && e.target.id === 'cancelCrop') {
            cancelCrop();
        }
    });

    // Cancelar recorte
    function cancelCrop() {
        const cropperSection = document.getElementById('cropperSection');
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
        cropperSection.style.display = 'none';
    }

    // Inicializar cuando el documento esté listo
    $(document).ready(function() {
        // Actualizar vista previa cuando cambien los campos
        $('#id_nombre, #id_descripcion, #id_precio').on('input change', function() {
            updatePreview();
        });

        // Actualizar imagen de vista previa cuando cambie el campo de imagen
        $('#id_imagen').on('change', function() {
            updatePreviewImage();
        });

        // Cargar vista previa inicial
        updatePreview();
        updatePreviewImage();

        // Verificar si hay una imagen existente al cargar
        setTimeout(function() {
            const existingImage = document.querySelector('.file-upload a[href*=".jpg"], .file-upload a[href*=".png"], .file-upload a[href*=".jpeg"]');
            if (existingImage && !document.getElementById('id_imagen').files.length) {
                updatePreviewImage();
            }
        }, 500);
    });

})(django.jQuery);

