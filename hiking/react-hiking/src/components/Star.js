//star icon button
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import StarIcon from '@rsuite/icons/legacy/Star';
import '../stylesheets/Star.css';

export function Star({id}) {
    function handleClick(event) {
        document.getElementById(id).style.color='yellow';

        if (document.getElementById(id).active) {
            document.getElementById(id).active = false;
            document.getElementById(id).style.color='#e5c95a';

        } else {
            document.getElementById(id).active = true;
            document.getElementById(id).style.color='#11a06e';
        }
    }

    return (
      <div className='Star'>
        <IconButton id={id} size='lg' icon={<StarIcon />} onClick={handleClick}/>
        </div>
    );
  }