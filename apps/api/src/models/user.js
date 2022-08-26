const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  institution: { type: String, required: true },
  nom: { type: String },
  prenom: { type: String },
  group: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  hasResetPassword: { type: Boolean, default: true },
  lastConnectedAt: { type: Date },
  museofile: [{ type: String }]
});

UserSchema.pre("save", function(next) {
  if (this.isModified("password") || this.isNew) {
    bcrypt.hash(this.password, 10, (e, hash) => {
      this.password = hash;
      next();
    });
  } else {
    return next();
  }
});

UserSchema.method("toJSON", function() {
  var user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
});

UserSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, res);
  });
};

UserSchema.methods.validatePassword = function(email, newPassword, cb){
  let validMdp = true;
  let message = "";
  /**
   * Le mot de passe doit contenir au moins :
   * - 1 caractère alphanumérique minuscule
   * - 1 majuscule
   * - 1 chiffre
   * - 1 caractère spécial
   * - 12 caractères
   */
  const patern = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]).{12,}$/);
  validMdp = patern.test(newPassword);

  if(validMdp){
    // le mot de passe ne doit pas contenir plus de 3 caractères consécutifs issu du login
    for(let i=0; i < newPassword.length - 1; i++){
      let verif = newPassword.substring(i, i + 3 );
      if(verif.length > 2 && email.indexOf(verif) > -1){
        validMdp = false;
        message = "La mise à jour du mot de passe à échoué.\n Le mot de passe modifié ne doit pas comporter plus de 2 caractères consécutifs issus du login."
      }
    }
  } else {
    message = "La mise à jour du mot de passe à échoué.\nVotre mot de passe doit comporter au moins 12 caractères ainsi qu'une minuscule, une majuscule, un chiffre et un caractère spécial.\nIl ne doit pas non plus comporter plus de 2 caractères issus de votre identifiant de connexion (email) "
  }
  return { success: validMdp, msg: message};
}

module.exports = mongoose.model("User", UserSchema);
